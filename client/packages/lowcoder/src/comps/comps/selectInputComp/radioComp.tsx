import { default as AntdRadioGroup } from "antd/es/radio/group";
import { RadioStyleType } from "comps/controls/styleControlConstants";
import styled, { css } from "styled-components";
import { UICompBuilder } from "../../generators";
import { CommonNameConfig, NameConfig, withExposingConfigs } from "../../generators/withExposing";
import { RadioChildrenMap, RadioLayoutOptions, RadioPropertyView } from "./radioCompConstants";
import {
  selectDivRefMethods,
  SelectInputInvalidConfig,
  useSelectInputValidate,
} from "./selectInputConstants";
import { EllipsisTextCss, ValueFromOption } from "lowcoder-design";
import { trans } from "i18n";
import { fixOldInputCompData } from "../textInputComp/textInputConstants";
import { migrateOldData } from "comps/generators/simpleGenerators";

const getStyle = (style: RadioStyleType) => {
  return css`
    .ant-radio-wrapper:not(.ant-radio-wrapper-disabled) {
      color: ${style.staticText};
      // height: 22px;
      max-width: calc(100% - 8px);
      padding: ${style.padding};
      span:not(.ant-radio) {
        ${EllipsisTextCss};
        font-family:${style.fontFamily};
        font-size:${style.textSize};
        font-weight:${style.textWeight};
        font-style:${style.fontStyle};
        text-transform:${style.textTransform};
        text-decoration:${style.textDecoration};
      }

      .ant-radio-checked {
        .ant-radio-inner {
          background-color: ${style.checkedBackground};
          border-color: ${style.checkedBackground};
        }

        &::after {
          border-color: ${style.checkedBackground};
        }
      }

      .ant-radio-inner {
        background-color: ${style.uncheckedBackground};
        border-color: ${style.uncheckedBorder};
        border-width:${style.borderWidth};
        &::after {
          background-color: ${style.checked};
        }
      }

      &:hover .ant-radio-inner, 
      .ant-radio:hover .ant-radio-inner,
      .ant-radio-input + ant-radio-inner {
        background-color:${style.hoverBackground ? style.hoverBackground:'#ffff'};
      }

      &:hover .ant-radio-inner,
      .ant-radio:hover .ant-radio-inner,
      .ant-radio-input:focus + .ant-radio-inner {
        border-color: ${style.checkedBackground};
      }
    }
  `;
};

const Radio = styled(AntdRadioGroup)<{
  $style: RadioStyleType;
  $layout: ValueFromOption<typeof RadioLayoutOptions>;
}>`
  width: 100%;
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

let RadioBasicComp = (function () {
  return new UICompBuilder(RadioChildrenMap, (props) => {
    const [
      validateState,
      handleChange,
    ] = useSelectInputValidate(props);
    return props.label({
      required: props.required,
      style: props.style,
      children: (
        <Radio
          ref={props.viewRef}
          disabled={props.disabled}
          value={props.value.value}
          $style={props.style}
          $layout={props.layout}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          options={props.options
            .filter((option) => option.value !== undefined && !option.hidden)
            .map((option) => ({
              label: option.label,
              value: option.value,
              disabled: option.disabled,
            }))}
        />
      ),
      ...validateState,
    });
  })
    .setPropertyViewFn((children) => <RadioPropertyView {...children} />)
    .setExposeMethodConfigs(selectDivRefMethods)
    .build();
})();

RadioBasicComp = migrateOldData(RadioBasicComp, fixOldInputCompData);

export const RadioComp = withExposingConfigs(RadioBasicComp, [
  new NameConfig("value", trans("selectInput.valueDesc")),
  SelectInputInvalidConfig,
  ...CommonNameConfig,
]);
