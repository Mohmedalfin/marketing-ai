import { InstagramIcon } from '../../Elements/icons/SosialMedia';
import { 
    useAiStudioController, 
    STYLE_OPTIONS, 
    PLATFORM_OPTIONS,
    TYPE_CONTENT 
} from '../../../hooks/useAiStudioController';
import { ToastNotification } from '../../Elements/ToastNotification';
import { confirmAction } from '../../../utils/swal';
import { PosterResultViewer } from "../../Elements/poster/PosterResultViewer";

import { 
    TrashIcon, 
    RefreshIcon, 
    ChangeImageIcon, 
    DropdownArrowIcon, 
    CheckIcon, 
    MenuDotsIcon, 
    CaptionIcon, 
    ClockIcon, 
    CalendarIcon, 
    SpinnerIcon 
} from '../../Elements/icons/AiStudioIcons';

const AiStudioSection = () => {
    const controller = useAiStudioController();
    const { 
        formData, 
        uiState, 
        aiStudio: { isGenerating, generatedPoster, generatedVideo, captionText, setCaptionText, loadingMessage },
        fileInputRef, 
        sectionRef, 
        instructionRef,
        handleImageUpload, 
        handleGenerate, 
        handleReset,
        handlePublish,
        togglePlatform, 
        toggleStyleDropdown, 
        toggleMediaTypeDropdown,
        togglePlatformDropdown, 
        setStyle,
        setMediaType,
        setTitle,
        setScheduledDate,
        setScheduledTime,
        hideToast
    } = controller;

    // --- SUB RENDERING FUNCTIONS ---

    const renderHeader = () => (
        <div className={`mb-10 transition-all duration-1000 ease-out ${uiState.isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
            <h1 className="text-2xl md:text-4xl font-extrabold uppercase text-primary tracking-tight">
                MULAI SIHIR KREATIFMU DI SINI
            </h1>
            <p className="mt-2 text-sm md:text-lg font-medium text-dark max-w-3xl">
                Unggah Foto Produk, Ketik Idemu, Dan Saksikan AI Kami Mengubahnya Menjadi Konten Level Agensi Dalam Hitungan Detik.
            </p>
        </div>
    );

    const renderInputStudio = () => (
        <div className={`lg:col-span-4 flex flex-col rounded-4xl border-2 border-primary bg-white p-6 shadow-sm transition-all duration-1000 delay-300 ease-out ${uiState.isVisible ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'}`}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-xl font-bold text-primary">AI STUDIO PINTAR</h2>
                <div className="flex gap-2">
                    <button 
                        onClick={async () => {
                            const confirmed = await confirmAction('Bersihkan Form?', 'Semua data dan gambar yang telah diunggah akan dihapus.', 'Ya, Bersihkan');
                            if (confirmed) handleReset();
                        }} 
                        className="p-2 rounded-full border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all focus:outline-hidden" 
                        title="Bersihkan Semua Data"
                    >
                        <TrashIcon />
                    </button>
                    <button 
                        onClick={handleGenerate} 
                        disabled={isGenerating || (!formData.imageFile && !formData.persistedBase64)}
                        className={`p-2 rounded-full border border-gray-200 text-gray-500 transition-all focus:outline-hidden ${(isGenerating || (!formData.imageFile && !formData.persistedBase64)) ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary hover:border-primary hover:bg-primary/5'}`}
                        title="Generate Ulang"
                    >
                        <RefreshIcon isGenerating={isGenerating} />
                    </button>
                </div>
            </div>

            <div 
                className="group relative flex flex-1 min-h-48 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary bg-light-bg/50 transition-all hover:bg-light-bg overflow-hidden shrink-0"
                onClick={() => fileInputRef.current?.click()}
            >
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                {formData.imagePreview ? (
                    <>
                        <img src={formData.imagePreview} alt="Uploaded" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChangeImageIcon />
                            <span className="text-sm font-bold text-white">Ganti Gambar</span>
                        </div>
                    </>
                ) : (
                    <>
                        <span className="text-xs md:text-sm font-bold text-dark mb-1">Upload Gambar Di Sini</span>
                        <span className="text-[10px] md:text-xs font-semibold text-primary underline decoration-primary/50 group-hover:decoration-primary transition-all text-center px-4">
                            Klik Untuk Memilih File Atau Drag & Drop
                        </span>
                        <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 scale-95 transition-all duration-300 group-hover:scale-100 group-hover:opacity-20"></div>
                    </>
                )}
            </div>

            <div className="mt-6 flex flex-col flex-1 shrink-0 min-h-56">
                <h3 className="text-xs md:text-sm font-bold text-primary uppercase mb-3 shrink-0">
                    INTRUKSI DESAIN DAN CAPTION
                </h3>                          
                <div className="rounded-2xl border border-primary p-4 bg-white focus-within:ring-2 focus-within:ring-primary/20 transition-all flex flex-col flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                    <div className="mb-3 flex relative">
                        <button 
                            onClick={() => toggleStyleDropdown()}
                            onBlur={() => setTimeout(() => toggleStyleDropdown(false), 200)}
                            className="flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-[10px] md:text-xs font-bold text-white focus:outline-hidden hover:bg-primary/90 transition-colors"
                        >
                            Kategori : {formData.style} 
                            <DropdownArrowIcon isOpen={uiState.isStyleDropdownOpen} />
                        </button>

                        <div className={`absolute top-full left-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white shadow-xl py-2 z-10 transition-all duration-200 origin-top-left ${uiState.isStyleDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                            {STYLE_OPTIONS.map((style) => (
                                <button
                                    key={style}
                                    onClick={() => setStyle(style)}
                                    className={`w-full text-left px-4 py-2 text-xs md:text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary ${formData.style === style ? 'text-primary bg-primary/5' : 'text-[#2b2b2b]'}`}
                                >
                                    {style}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-3 flex relative">
                        <button 
                            onClick={() => toggleMediaTypeDropdown()}
                            onBlur={() => setTimeout(() => toggleMediaTypeDropdown(false), 200)}
                            className="flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-[10px] md:text-xs font-bold text-white focus:outline-hidden hover:bg-primary/90 transition-colors"
                        >
                            Type : {formData.mediaType} 
                            <DropdownArrowIcon isOpen={uiState.isMediaTypeDropdownOpen} />
                        </button>

                        <div className={`absolute top-full left-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white shadow-xl py-2 z-10 transition-all duration-200 origin-top-left ${uiState.isMediaTypeDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                            {TYPE_CONTENT.map((typeOption) => (
                                <button
                                    key={typeOption}
                                    onClick={() => setMediaType(typeOption)}
                                    className={`w-full text-left px-4 py-2 text-xs md:text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary ${formData.mediaType === typeOption ? 'text-primary bg-primary/5' : 'text-[#2b2b2b]'}`}
                                >
                                    {typeOption}
                                </button>
                            ))}
                        </div>
                    </div>
                    </div>
                    
                    <textarea  
                        ref={instructionRef}
                        className="w-full flex-1 resize-none text-xs md:text-sm font-medium text-dark bg-transparent outline-hidden placeholder:text-gray-400 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        placeholder="Masukkan Instruksi Desain"
                    ></textarea>
                </div>
            </div>

            <div className="mt-auto pt-4">
                <button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className={`w-full rounded-full py-3 md:py-3.5 text-base md:text-lg font-bold text-white shadow-md transition-all duration-300 focus:outline-hidden flex items-center justify-center gap-2 ${isGenerating ? 'bg-gray-400 cursor-not-allowed shadow-none transform-none' : 'bg-[#F98C23] hover:bg-[#e07a1b] hover:-translate-y-1 hover:shadow-lg'}`}
                >
                    {isGenerating ? <><SpinnerIcon /> Memproses...</> : "Generate"}
                </button>
            </div>
        </div>
    );

    const renderPosterResult = () => {
        const isVideo = formData.mediaType.toLowerCase() === 'video';
        const generatedMedia = isVideo ? generatedVideo : generatedPoster;
        return (
            <div className="flex flex-col self-start w-full">
               <PosterResultViewer 
                formData={formData}
                generatedMedia={generatedMedia} 
                isGenerating={isGenerating}
                loadingMessage={loadingMessage}
            />
            </div>
        );
    };

    const renderCaptionResult = () => {
        const isVideo = formData.mediaType.toLowerCase() === 'video';
        const hasContent = isVideo ? !!generatedVideo : !!generatedPoster;
        return (
        <div className={`flex flex-col flex-1 ${hasContent ? 'min-h-[220px] md:min-h-0' : 'min-h-[100px] h-32 lg:h-auto'} transition-all duration-700 ease-in-out rounded-2xl border border-primary p-4 bg-white relative`}>
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                        <CaptionIcon />
                    </div>
                    <span className="rounded-full bg-primary px-3 py-0.5 text-[10px] md:text-xs font-bold text-white">Title & Caption</span>
                </div>
                <MenuDotsIcon />
            </div>
            
            <div className="flex flex-col flex-1 gap-3">
                {/* Post Title Input */}
                <input 
                    type="text"
                    className="w-full px-2 py-1 text-xs md:text-sm font-bold text-primary bg-transparent border-b border-dashed border-primary/30 outline-hidden placeholder:text-gray-300 transition-all focus:border-primary"
                    placeholder="Tulis Judul Postingan..."
                    value={formData.title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                {isGenerating ? (
                    <div className="w-full flex-1 flex flex-col gap-2.5 animate-pulse mt-2 px-1">
                        <div className="h-2.5 md:h-3 bg-gray-200 rounded-full w-3/4"></div>
                        <div className="h-2.5 md:h-3 bg-gray-200 rounded-full w-full"></div>
                        <div className="h-2.5 md:h-3 bg-gray-200 rounded-full w-full"></div>
                        <div className="h-2.5 md:h-3 bg-gray-200 rounded-full w-5/6"></div>
                        <div className="h-2.5 md:h-3 bg-gray-200 rounded-full w-1/2 mt-4"></div>
                        <div className="h-2.5 md:h-3 bg-gray-200 rounded-full w-2/3 mt-2"></div>
                    </div>
                ) : (
                    <textarea 
                        className="w-full flex-1 resize-none text-[11px] md:text-sm font-medium text-dark leading-relaxed bg-transparent outline-hidden placeholder:text-gray-300 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        value={captionText}
                        onChange={(e) => setCaptionText(e.target.value)}
                        placeholder="Belum ada caption. Hasil tulisan AI akan muncul di sini..."
                    />
                )}
            </div>
        </div>
        );
    };

    const renderPlatformControls = () => (
        <>
            <div className="mt-6 flex flex-col relative">
                <span className="text-xs md:text-sm font-bold text-primary mb-2">Platform</span>
                {uiState.isPlatformDropdownOpen && (
                    <div className="fixed inset-0 z-10" onClick={() => togglePlatformDropdown(false)} />
                )}
                <button 
                    onClick={() => togglePlatformDropdown()}
                    className="relative z-20 flex items-center gap-3 rounded-full border border-primary px-4 py-2 md:py-2.5 bg-white cursor-pointer hover:bg-light-bg transition-colors focus:outline-hidden"
                >
                    {formData.platforms.length === 1 && formData.platforms[0] === 'Instagram' && (
                        <InstagramIcon className="w-4 h-4 md:w-5 md:h-5 object-contain" />
                    )}
                    <span className={`text-xs md:text-sm font-bold text-dark grow text-left ${!(formData.platforms.length === 1 && formData.platforms[0] === 'Instagram') ? 'pl-2' : ''}`}>
                        {formData.platforms.length === 0 ? 'Pilih Platform' 
                            : formData.platforms.length === 1 ? formData.platforms[0] 
                            : `${formData.platforms.length} Platform Terpilih`}
                    </span>
                    <DropdownArrowIcon isOpen={uiState.isPlatformDropdownOpen} svgClass="w-4 h-4 text-dark" />
                </button>

                <div className={`absolute top-18 left-0 w-full rounded-xl border border-gray-100 bg-white shadow-xl py-2 z-20 transition-all duration-200 origin-top ${uiState.isPlatformDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                    {PLATFORM_OPTIONS.map((platform) => {
                        const isSelected = formData.platforms.includes(platform);
                        return (
                            <button
                                key={platform}
                                onClick={() => togglePlatform(platform)}
                                className={`flex items-center justify-between w-full text-left px-4 py-2 text-xs md:text-sm font-bold transition-colors hover:bg-primary/10 hover:text-primary ${isSelected ? 'text-primary bg-primary/5' : 'text-dark'}`}
                            >
                                <div className="flex items-center gap-3">
                                    {platform === 'Instagram' && <InstagramIcon className="w-5 h-5 object-contain" />}
                                    <span className={`${platform !== 'Instagram' ? 'pl-8' : ''}`}>{platform}</span>
                                </div>
                                <div className={`shrink-0 flex items-center justify-center w-5 h-5 rounded border ${isSelected ? 'bg-primary border-primary text-white' : 'border-gray-300 bg-white'}`}>
                                    {isSelected && <CheckIcon />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-4 flex flex-col">
                <span className="text-xs md:text-sm font-bold text-primary mb-2">JADWAL POSTING</span>
                <div className="flex gap-2 md:gap-3">
                    <div className="relative flex items-center justify-between w-1/2 rounded-full border border-primary px-3 md:px-4 bg-white cursor-pointer focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden h-9 md:h-10">
                        <input 
                            type="time" 
                            value={formData.scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                            className="w-full h-full text-[11px] md:text-sm font-semibold text-dark outline-hidden bg-transparent cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer z-10" 
                        />
                        <ClockIcon />
                    </div>
                    <div className="relative flex items-center justify-between w-1/2 rounded-full border border-primary px-3 md:px-4 bg-white cursor-pointer hover:bg-light-bg focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden h-9 md:h-10">
                        <input 
                            type="date"
                            value={formData.scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full h-full text-[11px] md:text-xs font-semibold text-dark outline-hidden bg-transparent cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer z-10" 
                        />
                        <CalendarIcon />
                    </div>
                </div>
            </div>

            <button 
                onClick={async () => {
                    const confirmed = await confirmAction('Jadwalkan Postingan?', 'Konfirmasi bahwa desain dan caption sudah sesuai.', 'Ya, Jadwalkan');
                    if (confirmed) handlePublish();
                }}
                disabled={uiState.isPublishing}
                className={`mt-auto pt-6 w-full focus:outline-hidden mb-4 transition-all duration-300 ${uiState.isPublishing ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                <div className={`w-full rounded-full py-3 md:py-3.5 text-base md:text-lg font-bold text-white shadow-md transition-all duration-300 flex items-center justify-center gap-2 ${uiState.isPublishing ? 'bg-gray-400' : 'bg-[#F98C23] hover:bg-[#e07a1b] hover:-translate-y-1 hover:shadow-lg'}`}>
                    {uiState.isPublishing ? <><SpinnerIcon /> Mengirim...</> : "Posting"}
                </div>
            </button>
        </>
    );

    return (
        <section ref={sectionRef} className="w-full px-6 md:px-12 lg:px-16 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                {renderHeader()}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {renderInputStudio()}
                    <div className={`relative lg:col-span-8 flex flex-col rounded-4xl border-2 border-primary bg-white p-6 sm:p-8 shadow-sm transition-all duration-1000 delay-500 ease-out ${uiState.isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 flex-1">
                            {renderPosterResult()}
                            <div className="flex flex-col h-full gap-4 md:gap-0 mt-4 md:mt-0">
                                {renderCaptionResult()}
                                {renderPlatformControls()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastNotification 
                message={uiState.toast?.message || ''}
                isVisible={uiState.toast?.isVisible || false}
                onClose={hideToast}
                type={uiState.toast?.type || 'success'}
            />
        </section>
    );

};

export default AiStudioSection;