import { default as AntdCheckboxGroup } from "antd/es/checkbox/Group";
import { SelectInputOptionControl } from "comps/controls/optionsControl";
import { BoolCodeControl } from "../../controls/codeControl";
import { arrayStringExposingStateControl } from "../../controls/codeStateControl";
import { LabelControl } from "../../controls/labelControl";
import { ChangeEventHandlerControl } from "../../controls/eventHandlerControl";
import { UICompBuilder } from "../../generators";
import { CommonNameConfig, NameConfig, withExposingConfigs } from "../../generators/withExposing";
import styled, { css } from "styled-components";
import {
  selectDivRefMethods,
  SelectInputInvalidConfig,
  SelectInputValidationChildren,
  useSelectInputValidate,
} from "./selectInputConstants";
import { formDataChildren } from "../formComp/formDataConstants";
import { styleControl } from "comps/controls/styleControl";
import { CheckboxStyle, CheckboxStyleType } from "comps/controls/styleControlConstants";
import { RadioLayoutOptions, RadioPropertyView } from "./radioCompConstants";
import { dropdownControl } from "../../controls/dropdownControl";
import { ValueFromOption } from "lowcoder-design";
import { EllipsisTextCss } from "lowcoder-design";
import { trans } from "i18n";
import { RefControl } from "comps/controls/refControl";
import { migrateOldData } from "comps/generators/simpleGenerators";
import { fixOldInputCompData } from "../textInputComp/textInputConstants";

export const getStyle = (style: CheckboxStyleType) => {
  return css`
    &,
    .ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled) {
      color: ${style.staticText};
      max-width: calc(100% - 8px);

      span:not(.ant-checkbox) {
        ${EllipsisTextCss};
      }

      .ant-checkbox-checked {
        .ant-checkbox-inner {
          background-color: ${style.checkedBackground};
          border-color: ${style.checkedBackground};
          border-width:${!!style.borderWidth ? style.borderWidth : '2px'};

          &::after {
            border-color: ${style.checked};
          }
        }

        &::after {
          border-color: ${style.checkedBackground};
          border-width:${!!style.borderWidth ? style.borderWidth : '2px'};
          border-radius: ${style.radius};
        }
      }
      
      .ant-checkbox-inner {
        border-radius: ${style.radius};
        background-color: ${style.uncheckedBackground};
        border-color: ${style.uncheckedBorder};
        border-width:${!!style.borderWidth ? style.borderWidth : '2px'};
      }
    
      &:hover .ant-checkbox-inner, 
      .ant-checkbox:hover .ant-checkbox-inner,
      .ant-checkbox-input + ant-checkbox-inner {
        background-color:${style.hoverBackground ? style.hoverBackground :'#fff'};
      }

      &:hover .ant-checkbox-checked .ant-checkbox-inner, 
      .ant-checkbox:hover .ant-checkbox-inner,
      .ant-checkbox-input + ant-checkbox-inner {
        background-color:${style.hoverBackground ? style.hoverBackground:'#ffff'};
      }

      &:hover .ant-checkbox-inner,
      .ant-checkbox:hover .ant-checkbox-inner,
      .ant-checkbox-input:focus + .ant-checkbox-inner {
        border-color: ${style.checkedBackground};
        border-width:${!!style.borderWidth ? style.borderWidth : '2px'};
      }
    }

    

    .ant-checkbox-group-item {
      font-family:${style.fontFamily};
      font-size:${style.textSize};
      font-weight:${style.textWeight};
      font-style:${style.fontStyle};
      text-transform:${style.textTransform};
      text-decoration:${style.textDecoration};
    }
    .ant-checkbox-wrapper {
      padding: ${style.padding};
      .ant-checkbox-inner,
      .ant-checkbox-checked::after {
        border-radius: ${style.radius};
      }
    }
  `;
};

const CheckboxGroup = styled(AntdCheckboxGroup) <{
  $style: CheckboxStyleType;
  $layout: ValueFromOption<typeof RadioLayoutOptions>;
}>`
  min-height: 32px;
  ${(props) => props.$style && getStyle(props.$style)}
  ${(props) => {
    if (props.$layout === "horizontal") {
      return css`
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      `;
    } else if (props.$layout === "vertical") {
      return css`
        display: flex;
        flex-direction: column;
      `;
    } else if (props.$layout === "auto_columns") {
      return css`
        break-inside: avoid;
        columns: 160px;
      `;
    }
  }}
`;

let CheckboxBasicComp = (function () {
  const childrenMap = {
    defaultValue: arrayStringExposingStateControl("defaultValue"),
    value: arrayStringExposingStateControl("value"),
    label: LabelControl,
    disabled: BoolCodeControl,
    onEvent: ChangeEventHandlerControl,
    options: SelectInputOptionControl,
    style: styleControl(CheckboxStyle),
    layout: dropdownControl(RadioLayoutOptions, "horizontal"),
    viewRef: RefControl<HTMLDivElement>,

    ...SelectInputValidationChildren,
    ...formDataChildren,
  };
  return new UICompBuilder(childrenMap, (props) => {
    const [
      validateState,
      handleChange,
    ] = useSelectInputValidate(props);
    return props.label({
      required: props.required,
      style: props.style,
      children: (
        <CheckboxGroup
          ref={props.viewRef}
          disabled={props.disabled}
          value={props.value.value}
          $style={props.style}
          $layout={props.layout}
          options={props.options
            .filter((option) => option.value !== undefined && !option.hidden)
            .map((option) => ({
              label: option.label,
              value: option.value,
              disabled: option.disabled,
            }))}
          onChange={(values) => {
            handleChange(values as string[]);
          }}
        />
      ),
      ...validateState,
    });
  })
    .setPropertyViewFn((children) => <RadioPropertyView {...children} />)
    .setExposeMethodConfigs(selectDivRefMethods)
    .build();
})();

CheckboxBasicComp = migrateOldData(CheckboxBasicComp, fixOldInputCompData);

export const CheckboxComp = withExposingConfigs(CheckboxBasicComp, [
  new NameConfig("value", trans("selectInput.valueDesc")),
  SelectInputInvalidConfig,
  ...CommonNameConfig,
]);
