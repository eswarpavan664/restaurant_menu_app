import React from 'react';

const DetectDevTools = WrappedComponent => {
    return class extends React.Component {
        componentDidMount() {
            window.addEventListener('devtoolschange', this.handleDevToolsChange);
        }

        componentWillUnmount() {
            window.removeEventListener('devtoolschange', this.handleDevToolsChange);
        }

        handleDevToolsChange = event => {
            if (event.detail.isOpen) {
                // Developer tools are open
                // Take action, e.g., display a warning message
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};

export default DetectDevTools;
