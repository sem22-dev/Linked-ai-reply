
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import AIIcon from './AIIcon';
import AIReplyModal from './AIReplyModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIconClick = () => {
    console.log('AI Icon clicked');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const root = document.createElement('div');
    root.id = 'linkedin-ai-extension-root';
    document.body.appendChild(root);

    const renderApp = () => {
      ReactDOM.render(
        <>
          <AIIcon onClick={handleIconClick} />
          {isModalOpen && <AIReplyModal onClose={handleCloseModal} />}
        </>,
        root
      );
    };

    renderApp();

    return () => {
      ReactDOM.unmountComponentAtNode(root);
      document.body.removeChild(root);
    };
  }, [isModalOpen]);

  return null;
};

export default App;