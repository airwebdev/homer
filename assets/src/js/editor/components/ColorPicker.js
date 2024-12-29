const { __experimentalPanelColorGradientSettings } = wp.blockEditor;
const { Dropdown, Tooltip } = wp.components;
const { __ } = wp.i18n;

homer.components.HomerColorPicker = ({ color, onChange }) => {
    return (
        <__experimentalPanelColorGradientSettings
            __experimentalHasMultipleOrigins
            clearable={false} 
            enableAlpha={true}
            className="homer-popover-color-picker simple"
            settings={[
                {
                    colorValue: color,
                    onColorChange: onChange,
                },
            ]}
        />
    );
};
