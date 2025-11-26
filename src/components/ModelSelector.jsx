import React, { useState } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

const models = [
    { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', description: 'Fast and efficient' },
    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', description: 'Most capable model' },
    { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash', description: 'Experimental next-gen' }
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
