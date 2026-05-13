import HelpHero from "../components/HelpHero";
import HelpQuickActions from "../components/HelpQuickActions";
import HelpEmergencySection from "../components/HelpEmergencySection";
import HelpDirectory from "../components/HelpDirectory";
import HelpFaq from "../components/HelpFaq";
import useHelpDirectory from "../hooks/useHelpDirectory";

import "../help.css";

export default function HelpPage() {
    const {
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        openDirectoryId,
        openFaqIndex,
        filteredDirectory,
        emergencyItems,
        helpCategories,
        helpFaqs,
        helpQuickActions,
        loading,
        error,
        refreshDirectory,
        toggleDirectoryItem,
        toggleFaq,
        clearSearch,
    } = useHelpDirectory();
    return (
        <main className="help-page">
            <HelpHero />

            <HelpQuickActions actions={helpQuickActions} />

            {loading && (
                <div className="help-api-state">
                    Loading directory contacts...
                </div>
            )}

            {error && (
                <div className="help-api-state error">
                    <strong>Unable to load directory.</strong>
                    <p>{error}</p>
                    <button type="button" onClick={refreshDirectory}>
                        Try Again
                    </button>
                </div>
            )}

            <HelpEmergencySection items={emergencyItems} />

            <HelpDirectory
                categories={helpCategories}
                directory={filteredDirectory}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                openDirectoryId={openDirectoryId}
                toggleDirectoryItem={toggleDirectoryItem}
                clearSearch={clearSearch}
            />

            <HelpFaq
                faqs={helpFaqs}
                openFaqIndex={openFaqIndex}
                toggleFaq={toggleFaq}
            />
        </main>
    );
}