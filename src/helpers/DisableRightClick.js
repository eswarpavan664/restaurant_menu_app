import React from 'react';

const DisableRightClick = WrappedComponent => {
    return class extends React.Component {
        componentDidMount() {
            document.addEventListener('contextmenu', this.disableContextMenu);
        }

        componentWillUnmount() {
            document.removeEventListener('contextmenu', this.disableContextMenu);
        }

        disableContextMenu = event => {
            event.preventDefault();
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};

export default DisableRightClick;
