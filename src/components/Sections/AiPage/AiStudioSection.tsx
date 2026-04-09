import { InstagramIcon } from '../../Elements/icons/SosialMedia';
import { 
    useAiStudioController, 
    STYLE_OPTIONS, 
    PLATFORM_OPTIONS 
} from '../../../hooks/useAiStudioController';
import { ToastNotification } from '../../Elements/ToastNotification';

const AiStudioSection = () => {
    const controller = useAiStudioController();
    const { 
        formData, 
        uiState, 
        aiStudio: { isGenerating, generatedPoster, captionText, setCaptionText, loadingMessage },
        fileInputRef, 
        sectionRef, 
        instructionRef,
        handleImageUpload, 
        handleGenerate, 
        handleReset,
        handlePublish,
        togglePlatform, 
        toggleStyleDropdown, 
        togglePlatformDropdown, 
        setStyle,
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
                    <button onClick={handleReset} className="p-2 rounded-full border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all focus:outline-hidden" title="Bersihkan Semua Data">
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

    const renderPosterResult = () => (
        <div className="flex flex-col self-start w-full rounded-2xl border border-primary p-4 overflow-hidden bg-primary-light/10">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                        <PhotoIcon />
                    </div>
                    <span className="rounded-full bg-primary px-3 py-0.5 text-[10px] md:text-xs font-bold text-white">Foto</span>
                </div>
                <MenuDotsIcon />
            </div>
            
            <div className="w-full flex-1 relative flex items-center justify-center">
                <div className={`relative w-full max-w-sm ${generatedPoster ? 'aspect-square' : 'h-24 lg:min-h-[350px] w-full'} transition-all duration-700 ease-in-out ring-1 ring-gray-900/5 shadow-2xl shadow-primary/20 rounded-xl overflow-hidden flex items-center justify-center p-2 bg-white`}>
                    {isGenerating ? (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50/90 backdrop-blur-sm p-6 text-center">
                            <SpinnerIcon className="w-8 h-8 md:w-10 md:h-10 text-primary/50 mb-4 animate-spin" />
                            <span className="text-[10px] md:text-xs font-bold text-primary animate-pulse">{loadingMessage}</span>
                        </div>
                    ) : generatedPoster ? (
                        <img src={generatedPoster} alt="Generated Poster Preview" className="w-full h-full object-contain transition-opacity duration-500" />
                    ) : (
                        <div className="flex items-center justify-center text-gray-400 w-full h-full text-[10px] md:text-xs text-center p-4">
                            Belum ada poster. Klik Generate.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderCaptionResult = () => (
        <div className={`flex flex-col flex-1 ${generatedPoster ? 'min-h-[220px] md:min-h-0' : 'min-h-[100px] h-32 lg:h-auto'} transition-all duration-700 ease-in-out rounded-2xl border border-primary p-4 bg-white relative`}>
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
                onClick={handlePublish}
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

// --- ICONS (Functional Components) ---

const TrashIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const RefreshIcon = ({ isGenerating }: { isGenerating: boolean }) => (
    <svg className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);

const ChangeImageIcon = () => (
    <svg className="w-8 h-8 text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const DropdownArrowIcon = ({ isOpen, svgClass = "w-3 h-3" }: { isOpen: boolean, svgClass?: string }) => (
    <svg className={`${svgClass} transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const MenuDotsIcon = () => (
    <svg className="w-5 h-5 text-primary cursor-pointer hover:opacity-70" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
    </svg>
);

const PhotoIcon = () => (
    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);

const CaptionIcon = PhotoIcon; // Reuse the same icon

const ClockIcon = () => (
    <svg className="w-4 h-4 md:w-5 md:h-5 text-primary absolute right-3 md:right-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CalendarIcon = () => (
    <svg className="w-4 h-4 md:w-5 md:h-5 text-primary absolute right-3 md:right-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const SpinnerIcon = ({ className = "animate-spin -ml-1 mr-2 h-5 w-5 text-white" }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export default AiStudioSection;