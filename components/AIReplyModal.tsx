
import React, { useState, useEffect, useRef } from 'react';
import send from "~/public/send.svg";
import regenerate from "~/public/regenerate.svg";
import insert from "~/public/insert.svg";

interface AIReplyModalProps {
  onClose: () => void;
}

const AIReplyModal: React.FC<AIReplyModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [prompt, setPrompt] = useState('');
  const [generatedResponse, setGeneratedResponse] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const [submittedPrompt, setSubmittedPrompt] = useState('');

  const handleGenerate = () => {
    setSubmittedPrompt(prompt);
    setPrompt('');
    setGeneratedResponse("Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.");
    setStep(2);
  };

  const handleInsert = () => {
    const messageInput = document.querySelector('.msg-form__contenteditable p') as HTMLElement;
    if (messageInput) {
      messageInput.innerText = generatedResponse;
      const event = new Event('input', { bubbles: true });
      messageInput.dispatchEvent(event);
    }
    onClose();
  };

  const handleRegenerate = () => {
    setGeneratedResponse("Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-[#FAF9FB] rounded-lg shadow-lg w-full max-w-[70%] lg:max-w-[40%]">
        <div className="p-8 space-y-8">
          {step === 1 ? (
            <>
              <div className=" rounded-md">
                <InputField
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Your prompt"
                />
              </div>
              <div className="flex justify-end">
                <ActionButton
                  onClick={handleGenerate}
                  label="Generate"
                  icon={send}
                  width={16}
                  height={16}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col relative gap-8">
                <div className="bg-gray-200 rounded-md p-2 max-w-[70%] self-end">
                  <p className="text-gray-600">{submittedPrompt}</p>
                </div>
                <div className="bg-blue-100 rounded-md p-3 max-w-[70%] self-start">
                  <p className="text-gray-800">{generatedResponse}</p>
                </div>
              </div>
              <InputField
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Your prompt"
                className="border border-gray-300 rounded-md p-2"
              />
              <div className="flex ga-2 justify-end space-x-2">
                <ActionButton
                  onClick={handleInsert}
                  label="Insert"
                  icon={insert}
                  width={12}
                  height={12}
                  className=" custom-button !border-[#666D80] !text-[#666D80] bg-white hover:bg-gray-50"
                />
                <ActionButton
                  onClick={handleRegenerate}
                  label="Regenerate"
                  icon={regenerate}
                  width={12}
                  height={12}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIReplyModal;


interface ActionButtonProps {
  onClick: () => void;
  label: string;
  icon?: string;
  className?: string;
  width?: number;
  height?: number;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, label, icon, className = '', width = 16, height = 16  }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600 ${className}`}
    >
      {icon && <img src={icon} alt={label} width={width} height={height} className='mr-4' />}
      {label}
    </button>
  );
};


interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ value, onChange, placeholder, className = '' }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="styled-input"
      placeholder={placeholder}
      style={{ WebkitAppearance: 'none' }}
    />
  );
};