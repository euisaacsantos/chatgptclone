import React, { useState } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

const models = [
    { id: 'gemini-pro', name: 'Gemini Pro', description: 'Great for everyday tasks' },
    { id: 'gemini-pro-vision', name: 'Gemini Pro Vision', description: 'Multimodal model' },
    { id: 'gemini-ultra', name: 'Gemini Ultra', description: 'Most capable model' }
];

const ModelSelector = ({ currentModel, onSelectModel }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (modelId) => {
        onSelectModel(modelId);
        setIsOpen(false);
    };

    const selectedModel = models.find(m => m.id === currentModel) || models[0];

    return (
        <div className="model-selector-container">
            <button
                className="model-selector-btn"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="model-name">{selectedModel.name}</span>
                <FiChevronDown className={`chevron ${isOpen ? 'open' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="model-dropdown-backdrop" onClick={() => setIsOpen(false)} />
                    <div className="model-dropdown">
                        {models.map(model => (
                            <button
                                key={model.id}
                                className={`model-option ${currentModel === model.id ? 'selected' : ''}`}
                                onClick={() => handleSelect(model.id)}
                            >
                                <div className="model-info">
                                    <span className="model-option-name">{model.name}</span>
                                    <span className="model-option-desc">{model.description}</span>
                                </div>
                                {currentModel === model.id && <FiCheck className="check-icon" />}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ModelSelector;
