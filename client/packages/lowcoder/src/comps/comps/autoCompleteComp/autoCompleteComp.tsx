import { useEffect, useState } from "react";
import { Input, Section, sectionNames } from "lowcoder-design";
import { BoolControl } from "comps/controls/boolControl";
import { styleControl } from "comps/controls/styleControl";
import {
  InputLikeStyle,
  InputLikeStyleType,
} from "comps/controls/styleControlConstants";
import {
  NameConfig,
  NameConfigPlaceHolder,
  NameConfigRequired,
  withExposingConfigs,
} from "comps/generators/withExposing";
import styled from "styled-components";
import { UICompBuilder, withDefault } from "../../generators";
import { FormDataPropertyView } from "../formComp/formDataConstants";
import { jsonControl } from "comps/controls/codeControl";
import { dropdownControl } from "comps/controls/dropdownControl";
import {
  TextInputBasicSection,
  textInputChildren,
  TextInputConfigs,
  TextInputInteractionSection,
  textInputValidate,
  TextInputValidationSection,
} from "../textInputComp/textInputConstants";
import {
  allowClearPropertyView,
  hiddenPropertyView,
} from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { IconControl } from "comps/controls/iconControl";
import { hasIcon } from "comps/utils";
import { InputRef } from "antd/es/input";
import { default as AntInput } from 'antd/es/input';
import { default as AntAutoComplete } from 'antd/es/auto-complete';
import { RefControl } from "comps/controls/refControl";
import {
  booleanExposingStateControl, jsonObjectExposingStateControl,
} from "comps/controls/codeStateControl";

import { getDayJSLocale } from "i18n/dayjsLocale";
import {
  autoCompleteDate,
  itemsDataTooltip,
  convertAutoCompleteData,
  valueOrLabelOption,
  autoCompleteRefMethods,
  autoCompleteType,
  autocompleteIconColor,
  FirstPinyinOption,
  AllPinyinOption,
} from "./autoCompleteConstants";
import { BaseOptionType, DefaultOptionType } from "antd/es/select";
import { pinyin } from 'pinyin-pro';
import { FilterFunc } from "rc-select/lib/Select";


const InputStyle = styled(Input) <{ $style: InputLikeStyleType }>`
  
`;


const AutoCompleteStyle = styled(AntAutoComplete) <{ $style: InputLikeStyleType }>`
  width: 100%;
  height: auto;
  .ant-input-affix-wrapper {
    padding: 0px;
    input {
      padding: ${props => props.$style.padding};
      color: ${props => props.$style.text};
      font-size: ${props => props.$style.textSize};
      font-weight: ${props => props.$style.textWeight};
      font-family: ${props => props.$style.fontFamily};
      font-style:${props => props.$style.fontStyle};
      text-transform:${props => props.$style.textTransform};
      text-decoration:${props => props.$style.textDecoration};
      background-color: ${props => props.$style.background};
      border-radius: calc(${props => props.$style.radius} * 1.5) 0 0 calc(${props => props.$style.radius} * 1.5);
    }
  }
  .ant-input-affix-wrapper .ant-input-suffix {
    min-width: 22px;
    margin-inline-start: -1px;
  }
  .ant-input-search >.ant-input-group >.ant-input-group-addon:last-child .ant-input-search-button {
    height: auto;
    min-width: 44px;
    border: ${props => props.$style.borderWidth} solid #1677ff;
    border-left-style: none;
    font-size: ${props => props.$style.textSize};
    padding: ${props => props.$style.padding};
  }
  
  .ant-input-search .ant-input-affix-wrapper {
    background-color: ${props => props.$style.background};
    border: ${props => props.$style.borderWidth} solid ${props => props.$style.border};
  }
  .ant-input-affix-wrapper .ant-input-suffix {
    background-color: ${props => props.$style.background};
}
`;


const childrenMap = {
  ...textInputChildren,
  viewRef: RefControl<InputRef>,
  allowClear: BoolControl.DEFAULT_TRUE,
  style: withDefault(styleControl(InputLikeStyle), {}),
  prefixIcon: IconControl,
  suffixIcon: IconControl,
  items: jsonControl(convertAutoCompleteData, autoCompleteDate),
  ignoreCase: BoolControl.DEFAULT_TRUE,
  searchFirstPY: BoolControl.DEFAULT_TRUE,
  searchCompletePY: BoolControl,
  searchLabelOnly: BoolControl.DEFAULT_TRUE,
  valueOrLabel: dropdownControl(valueOrLabelOption, "label"),
  autoCompleteType: dropdownControl(autoCompleteType, "normal"),
  autocompleteIconColor: dropdownControl(autocompleteIconColor, "blue"),
  valueInItems: booleanExposingStateControl("valueInItems"),
  selectObject: jsonObjectExposingStateControl("selectObject", {}),
};

const getValidate = (value: any): "" | "warning" | "error" | undefined => {
  if (
    value.hasOwnProperty("validateStatus") &&
    value["validateStatus"] === "error"
  )
    return "error";
  return "";
};

let AutoCompleteCompBase = (function () {
  return new UICompBuilder(childrenMap, (props) => {
    const {
      items,
      onEvent,
      placeholder,
      searchFirstPY,
      searchCompletePY,
      searchLabelOnly,
      ignoreCase,
      valueOrLabel,
      autoCompleteType,
      autocompleteIconColor,
    } = props;


    const getTextInputValidate = () => {
      return {
        value: { value: props.value.value },
        required: props.required,
        minLength: props?.minLength ?? 0,
        maxLength: props?.maxLength ?? 0,
        validationType: props.validationType,
        regex: props.regex,
        customRule: props.customRule,
      };
    };

    const [activationFlag, setActivationFlag] = useState(false);
    const [searchtext, setsearchtext] = useState<string>(props.value.value);
    const [validateState, setvalidateState] = useState({});

    //   是否中文环境
    const [chineseEnv, setChineseEnv] = useState(getDayJSLocale() === "zh-cn");

    useEffect(() => {
      setsearchtext(props.value.value);
      activationFlag &&
        setvalidateState(textInputValidate(getTextInputValidate()));
    }, [
      props.value.value,
      props.required,
      props?.minLength,
      props?.maxLength,
      props.validationType,
      props.regex,
      props.customRule,
    ]);

    const onChange = (value: unknown) => {
      props.valueInItems.onChange(false);
      setvalidateState(textInputValidate(getTextInputValidate()));
      setsearchtext(value as string);
      props.value.onChange(value as string);
      props.onEvent("change")
    }
    const onFocus = () => {
      setActivationFlag(true)
      props.onEvent("focus")
    }
    const onBlur = () => {
      props.onEvent("blur")
    }
    const onSelect = (data: unknown, option: BaseOptionType) => {
      setsearchtext(option[valueOrLabel]);
      props.valueInItems.onChange(true);
      props.value.onChange(option[valueOrLabel]);
      props.selectObject.onChange(option);
      props.onEvent("submit");
    }

    const filterOption: FilterFunc<DefaultOptionType | BaseOptionType> = (inputValue: string, option?: BaseOptionType) => {
      var InputValueLowerCase = inputValue.toLowerCase()
      if (ignoreCase) {
        if (
          option!.label
            .toLowerCase()
            .indexOf(InputValueLowerCase) !== -1
        )
          return true;
      } else {
        if (option!.label.indexOf(inputValue) !== -1)
          return true;
      }
      if (
        chineseEnv &&
        searchFirstPY &&
        pinyin(option!.label, FirstPinyinOption)

          .indexOf(InputValueLowerCase) >= 0
      )
        return true;
      if (
        chineseEnv &&
        searchCompletePY &&
        pinyin(option!.label, AllPinyinOption)
          .indexOf(InputValueLowerCase) >= 0
      )
        return true;
      if (!searchLabelOnly) {
        if (ignoreCase) {
          if (
            option!.value
              .toLowerCase()
              .indexOf(InputValueLowerCase) !== -1
          )
            return true;
        } else {
          if (
            option!.value.indexOf(inputValue) !== -1
          )
            return true;
        }
        if (
          chineseEnv &&
          searchFirstPY &&
          pinyin(option!.value, FirstPinyinOption)
            .indexOf(InputValueLowerCase) >= 0
        )
          return true;
        if (
          chineseEnv &&
          searchCompletePY &&
          pinyin(option!.value, AllPinyinOption)
            .indexOf(InputValueLowerCase) >= 0
        )
          return true;
      }
      return false;
    }


    return props.label({
      required: props.required,
      children: (
        <AutoCompleteStyle
          $style={props.style}
          disabled={props.disabled}
          value={searchtext}
          options={items}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          filterOption={filterOption}
        >
          {autoCompleteType === "AntDesign" ? (
            <AntInput.Search
              placeholder={placeholder}
              enterButton={autocompleteIconColor === "blue"}
              allowClear={props.allowClear}
              ref={props.viewRef}
              onPressEnter={undefined}
              status={getValidate(validateState)}
              onSubmit={() => props.onEvent("submit")}
            />
          ) : (
            <InputStyle
              ref={props.viewRef}
              placeholder={placeholder}
              allowClear={props.allowClear}
              $style={props.style}
              prefix={hasIcon(props.prefixIcon) && props.prefixIcon}
              suffix={hasIcon(props.suffixIcon) && props.suffixIcon}
              status={getValidate(validateState)}
              onPressEnter={undefined}
            />
          )}

        </AutoCompleteStyle>

      ),
      style: props.style,
      ...validateState,
    });
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={trans("autoComplete.ComponentType")}>
            {children.autoCompleteType.propertyView({
              label: trans("autoComplete.type"),
              radioButton: true,
            })}
            {children.autoCompleteType.getView() === "AntDesign" &&
              children.autocompleteIconColor.propertyView({
                label: trans("button.prefixIcon"),
                radioButton: true,
              })}

            {children.autoCompleteType.getView() === "normal" &&
              children.prefixIcon.propertyView({
                label: trans("button.prefixIcon"),
              })}
            {children.autoCompleteType.getView() === "normal" &&
              children.suffixIcon.propertyView({
                label: trans("button.suffixIcon"),
              })}
          </Section>
          <Section name={trans("autoComplete.SectionDataName")}>
            {children.items.propertyView({
              label: trans("autoComplete.value"),
              tooltip: itemsDataTooltip,
              placeholder: "[]",
            })}
            {getDayJSLocale() === "zh-cn" &&
              children.searchFirstPY.propertyView({
                label: trans("autoComplete.searchFirstPY"),
              })}
            {getDayJSLocale() === "zh-cn" &&
              children.searchCompletePY.propertyView({
                label: trans("autoComplete.searchCompletePY"),
              })}
            {children.searchLabelOnly.propertyView({
              label: trans("autoComplete.searchLabelOnly"),
            })}
            {children.ignoreCase.propertyView({
              label: trans("autoComplete.ignoreCase"),
            })}
            {children.valueOrLabel.propertyView({
              label: trans("autoComplete.checkedValueFrom"),
              radioButton: true,
            })}
            {allowClearPropertyView(children)}
          </Section>
          <TextInputBasicSection {...children} />

          <FormDataPropertyView {...children} />
          {children.label.getPropertyView()}

          <TextInputInteractionSection {...children} />

          {<TextInputValidationSection {...children} />}

          <Section name={sectionNames.layout}>
            {hiddenPropertyView(children)}
          </Section>

          <Section name={sectionNames.style}>
            {children.style.getPropertyView()}
          </Section>
        </>
      );
    })
    .setExposeMethodConfigs(autoCompleteRefMethods)
    .setExposeStateConfigs([
      new NameConfig("value", trans("export.inputValueDesc")),
      new NameConfig("valueInItems", trans("autoComplete.valueInItems")),
      NameConfigPlaceHolder,
      NameConfigRequired,
      ...TextInputConfigs,
    ])
    .build();
})();

AutoCompleteCompBase = class extends AutoCompleteCompBase {
  override autoHeight(): boolean {
    return true;
  }
};

export const AutoCompleteComp = withExposingConfigs(AutoCompleteCompBase, [
  new NameConfig("value", trans("export.inputValueDesc")),
  new NameConfig("selectObject", trans("export.selectObjectDesc")),
  new NameConfig("valueInItems", trans("autoComplete.valueInItems")),
  NameConfigPlaceHolder,
  NameConfigRequired,
  ...TextInputConfigs,
]);
