import { default as Tooltip } from "antd/es/tooltip";
import { getThemeDetailName, isThemeColorKey, ThemeDetail } from "api/commonSettingApi";
import { ControlItemCompBuilder } from "comps/generators/controlCompBuilder";
import { childrenToProps, ToConstructor } from "comps/generators/multi";
import { BackgroundColorContext } from "comps/utils/backgroundColorContext";
import { ThemeContext } from "comps/utils/themeContext";
import { trans } from "i18n";
import _ from "lodash";
import {
  controlItem,
  IconRadius,
  IconReset,
  ExpandIcon,
  CompressIcon,
  TextSizeIcon,
  FontFamilyIcon,
  TextWeightIcon,
  ShowBorderIcon,
  BorderWidthIcon,
  ImageCompIcon,
} from "lowcoder-design";
import { useContext } from "react";
import styled from "styled-components";
import { useIsMobile } from "util/hooks";
import { CSSCodeControl, ObjectControl, RadiusControl, StringControl } from "./codeControl";
import { ColorControl } from "./colorControl";
import {
  defaultTheme,
  DepColorConfig,
  DEP_TYPE,
  RadiusConfig,
  SimpleColorConfig,
  SingleColorConfig,
  MarginConfig,
  PaddingConfig,
  TextSizeConfig,
  TextWeightConfig,
  FontFamilyConfig,
  FontStyleConfig,
  BorderWidthConfig,
  BackgroundImageConfig,
  BackgroundImageRepeatConfig,
  BackgroundImageSizeConfig,
  BackgroundImagePositionConfig,
  BackgroundImageOriginConfig,
  HeaderBackgroundImageConfig,
  HeaderBackgroundImageRepeatConfig,
  HeaderBackgroundImageSizeConfig,
  HeaderBackgroundImagePositionConfig,
  HeaderBackgroundImageOriginConfig,
  FooterBackgroundImageConfig,
  FooterBackgroundImageRepeatConfig,
  FooterBackgroundImageSizeConfig,
  FooterBackgroundImagePositionConfig,
  FooterBackgroundImageOriginConfig,


} from "./styleControlConstants";
import { faTextWidth } from "@fortawesome/free-solid-svg-icons";
import appSelectControl from "./appSelectControl";

function isSimpleColorConfig(config: SingleColorConfig): config is SimpleColorConfig {
  return config.hasOwnProperty("color");
}

function isDepColorConfig(config: SingleColorConfig): config is DepColorConfig {
  return config.hasOwnProperty("depName") || config.hasOwnProperty("depTheme");
}

function isRadiusConfig(config: SingleColorConfig): config is RadiusConfig {
  return config.hasOwnProperty("radius");
}

function isBorderWidthConfig(config: SingleColorConfig): config is BorderWidthConfig {
  return config.hasOwnProperty("borderWidth");
}

function isBackgroundImageConfig(config: SingleColorConfig): config is BackgroundImageConfig {
  return config.hasOwnProperty("backgroundImage");
}

function isBackgroundImageRepeatConfig(config: SingleColorConfig): config is BackgroundImageRepeatConfig {
  return config.hasOwnProperty("backgroundImageRepeat");
}

function isBackgroundImageSizeConfig(config: SingleColorConfig): config is BackgroundImageSizeConfig {
  return config.hasOwnProperty("backgroundImageSize");
}

function isBackgroundImagePositionConfig(config: SingleColorConfig): config is BackgroundImagePositionConfig {
  return config.hasOwnProperty("backgroundImagePosition");
}

function isBackgroundImageOriginConfig(config: SingleColorConfig): config is BackgroundImageOriginConfig {
  return config.hasOwnProperty("backgroundImageOrigin");
}

function isHeaderBackgroundImageConfig(config: SingleColorConfig): config is HeaderBackgroundImageConfig {
  return config.hasOwnProperty("headerBackgroundImage");
}
function isHeaderBackgroundImageRepeatConfig(config: SingleColorConfig): config is HeaderBackgroundImageRepeatConfig {
  return config.hasOwnProperty("headerBackgroundImageRepeat");
}
function isHeaderBackgroundImageSizeConfig(config: SingleColorConfig): config is HeaderBackgroundImageSizeConfig {
  return config.hasOwnProperty("headerBackgroundImageSize");
}
function isHeaderBackgroundImagePositionConfig(config: SingleColorConfig): config is HeaderBackgroundImagePositionConfig {
  return config.hasOwnProperty("headerBackgroundImagePosition");
}
function isHeaderBackgroundImageOriginConfig(config: SingleColorConfig): config is HeaderBackgroundImageOriginConfig {
  return config.hasOwnProperty("headerBackgroundImageOrigin");
}
function isFooterBackgroundImageConfig(config: SingleColorConfig): config is FooterBackgroundImageConfig {
  return config.hasOwnProperty("footerBackgroundImage");
}
function isFooterBackgroundImageRepeatConfig(config: SingleColorConfig): config is FooterBackgroundImageRepeatConfig {
  return config.hasOwnProperty("footerBackgroundImageRepeat");
}
function isFooterBackgroundImageSizeConfig(config: SingleColorConfig): config is FooterBackgroundImageSizeConfig {
  return config.hasOwnProperty("footerBackgroundImageSize");
}
function isFooterBackgroundImagePositionConfig(config: SingleColorConfig): config is FooterBackgroundImagePositionConfig {
  return config.hasOwnProperty("footerBackgroundImagePosition");
}
function isFooterBackgroundImageOriginConfig(config: SingleColorConfig): config is FooterBackgroundImageOriginConfig {
  return config.hasOwnProperty("footerBackgroundImageOrigin");
}

function isTextSizeConfig(config: SingleColorConfig): config is TextSizeConfig {
  return config.hasOwnProperty("textSize");
}

function isTextWeightConfig(config: SingleColorConfig): config is TextWeightConfig {
  return config.hasOwnProperty("textWeight");
}

function isFontFamilyConfig(config: SingleColorConfig): config is FontFamilyConfig {
  return config.hasOwnProperty("fontFamily");
}
function isFontStyleConfig(config: SingleColorConfig): config is FontStyleConfig {
  return config.hasOwnProperty("fontStyle");
}

function isMarginConfig(config: SingleColorConfig): config is MarginConfig {
  return config.hasOwnProperty("margin");
}

function isPaddingConfig(config: SingleColorConfig): config is PaddingConfig {
  return config.hasOwnProperty("padding");
}

// function styleControl(colorConfig: Array<SingleColorConfig>) {
type Names<T extends readonly SingleColorConfig[]> = T[number]["name"];
export type StyleConfigType<T extends readonly SingleColorConfig[]> = { [K in Names<T>]: string };

// Options[number]["value"]
function isEmptyColor(color: string) {
  return _.isEmpty(color);
}

function isEmptyRadius(radius: string) {
  return _.isEmpty(radius);
}
function isEmptyBorderWidth(borderWidth: string) {
  return _.isEmpty(borderWidth);
}
function isEmptyBackgroundImageConfig(backgroundImage: string) {
  return _.isEmpty(backgroundImage);
}
function isEmptyBackgroundImageRepeatConfig(backgroundImageRepeat: string) {
  return _.isEmpty(backgroundImageRepeat);
}
function isEmptyBackgroundImageSizeConfig(backgroundImageSize: string) {
  return _.isEmpty(backgroundImageSize);
}
function isEmptyBackgroundImagePositionConfig(backgroundImagePosition: string) {
  return _.isEmpty(backgroundImagePosition);
}
function isEmptyBackgroundImageOriginConfig(backgroundImageOrigin: string) {
  return _.isEmpty(backgroundImageOrigin);
}
function isEmptyHeaderBackgroundImageConfig(headerBackgroundImage: string) {
  return _.isEmpty(headerBackgroundImage);
}
function isEmptyHeaderBackgroundImageRepeatConfig(headerBackgroundImageRepeat: string) {
  return _.isEmpty(headerBackgroundImageRepeat);
}
function isEmptyHeaderBackgroundImageSizeConfig(headerBackgroundImageSize: string) {
  return _.isEmpty(headerBackgroundImageSize);
}
function isEmptyHeaderBackgroundImagePositionConfig(headerBackgroundImagePosition: string) {
  return _.isEmpty(headerBackgroundImagePosition);
}
function isEmptyHeaderBackgroundImageOriginConfig(headerBackgroundImageOrigin: string) {
  return _.isEmpty(headerBackgroundImageOrigin);
}
function isEmptyFooterBackgroundImageConfig(footerBackgroundImage: string) {
  return _.isEmpty(footerBackgroundImage);
}
function isEmptyFooterBackgroundImageRepeatConfig(footerBackgroundImageRepeat: string) {
  return _.isEmpty(footerBackgroundImageRepeat);
}
function isEmptyFooterBackgroundImageSizeConfig(footerBackgroundImageSize: string) {
  return _.isEmpty(footerBackgroundImageSize);
}
function isEmptyFooterBackgroundImagePositionConfig(footerBackgroundImagePosition: string) {
  return _.isEmpty(footerBackgroundImagePosition);
}
function isEmptyFooterBackgroundImageOriginConfig(footerBackgroundImageOrigin: string) {
  return _.isEmpty(footerBackgroundImageOrigin);
}

function isEmptyTextSize(textSize: string) {
  return _.isEmpty(textSize);
}
function isEmptyTextWeight(textWeight: string) {
  return _.isEmpty(textWeight);
}
function isEmptyFontFamily(fontFamily: string) {
  return _.isEmpty(fontFamily);
}
function isEmptyFontStyle(fontStyle: string) {
  return _.isEmpty(fontStyle);
}

function isEmptyMargin(margin: string) {
  return _.isEmpty(margin);
}
function isEmptyPadding(padding: string) {
  return _.isEmpty(padding);
}

/**
 * Calculate the actual used color from the dsl color
 */
function calcColors<ColorMap extends Record<string, string>>(
  props: ColorMap,
  colorConfigs: readonly SingleColorConfig[],
  theme?: ThemeDetail,
  bgColor?: string
) {
  const themeWithDefault = (theme || defaultTheme) as unknown as Record<string, string>;
  // Cover what is not there for the first pass
  let res: Record<string, string> = {};
  colorConfigs.forEach((config) => {
    const name = config.name;
    if (!isEmptyRadius(props[name]) && isRadiusConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyBorderWidth(props[name]) && isBorderWidthConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyBackgroundImageConfig(props[name]) && isBackgroundImageConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyBackgroundImageRepeatConfig(props[name]) && isBackgroundImageRepeatConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyBackgroundImageSizeConfig(props[name]) && isBackgroundImageSizeConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyBackgroundImagePositionConfig(props[name]) && isBackgroundImagePositionConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyBackgroundImageOriginConfig(props[name]) && isBackgroundImageOriginConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyHeaderBackgroundImageConfig(props[name]) && isHeaderBackgroundImageConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyHeaderBackgroundImageRepeatConfig(props[name]) && isHeaderBackgroundImageRepeatConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyHeaderBackgroundImageSizeConfig(props[name]) && isHeaderBackgroundImageSizeConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyHeaderBackgroundImagePositionConfig(props[name]) && isHeaderBackgroundImagePositionConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyHeaderBackgroundImageOriginConfig(props[name]) && isHeaderBackgroundImageOriginConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyFooterBackgroundImageConfig(props[name]) && isFooterBackgroundImageConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyFooterBackgroundImageRepeatConfig(props[name]) && isFooterBackgroundImageRepeatConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyFooterBackgroundImageSizeConfig(props[name]) && isFooterBackgroundImageSizeConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyFooterBackgroundImagePositionConfig(props[name]) && isFooterBackgroundImagePositionConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyFooterBackgroundImageOriginConfig(props[name]) && isFooterBackgroundImageOriginConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyTextSize(props[name]) && isTextSizeConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyTextWeight(props[name]) && isTextWeightConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyFontFamily(props[name]) && isFontFamilyConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyFontStyle(props[name]) && isFontStyleConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyMargin(props[name]) && isMarginConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyPadding(props[name]) && isPaddingConfig(config)) {
      res[name] = props[name];
      return;
    }
    if (!isEmptyColor(props[name])) {
      if (isThemeColorKey(props[name])) {
        res[name] = themeWithDefault[props[name]];
      } else {
        res[name] = props[name];
      }
      return;
    }
    if (isSimpleColorConfig(config)) {
      res[name] = config.color;
    }
    if (isRadiusConfig(config)) {
      res[name] = themeWithDefault[config.radius];
    }
    if (isBorderWidthConfig(config)) {
      res[name] =  config?.defaultValue ?? '0px'; 
    }
    if (isBackgroundImageConfig(config)) {
      res[name] = '';
    }
    if (isBackgroundImageRepeatConfig(config)) {
      res[name] = 'no-repeat';
    }
    if (isBackgroundImageSizeConfig(config)) {
      res[name] = 'cover';
    }
    if (isBackgroundImagePositionConfig(config)) {
      res[name] = 'center';
    }
    if (isBackgroundImageOriginConfig(config)) {
      res[name] = 'padding-box';
    }
    if (isHeaderBackgroundImageConfig(config)) {
      res[name] = '';
    }
    if (isHeaderBackgroundImageRepeatConfig(config)) {
      res[name] = 'no-repeat';
    }
    if (isHeaderBackgroundImageSizeConfig(config)) {
      res[name] = 'cover';
    }
    if (isHeaderBackgroundImagePositionConfig(config)) {
      res[name] = 'center';
    }
    if (isHeaderBackgroundImageOriginConfig(config)) {
      res[name] = 'padding-box';
    }
    if (isFooterBackgroundImageConfig(config)) {
      res[name] = '';
    }
    if (isFooterBackgroundImageRepeatConfig(config)) {
      res[name] = 'no-repeat';
    }
    if (isFooterBackgroundImageSizeConfig(config)) {
      res[name] = 'cover';
    }
    if (isFooterBackgroundImagePositionConfig(config)) {
      res[name] = 'center';
    }
    if (isFooterBackgroundImageOriginConfig(config)) {
      res[name] = 'padding-box';
    }
    if (isTextSizeConfig(config)) {
      // TODO: remove default textSize after added in theme in backend.
      res[name] = themeWithDefault[config.textSize] || '14px';
    }
    if (isTextWeightConfig(config)) {
      // TODO: remove default textWeight after added in theme in backend.
      res[name] = themeWithDefault[config.textWeight] || 'normal';
    }
    if (isFontFamilyConfig(config)) {
      res[name] = themeWithDefault[config.fontFamily] || 'sans-serif';
    }
    if (isFontStyleConfig(config)) {
      res[name] = themeWithDefault[config.fontStyle] || 'normal'
    }
    if (isMarginConfig(config)) {
      res[name] = themeWithDefault[config.margin];
    }
    if (isPaddingConfig(config)) {
      res[name] = themeWithDefault[config.padding];
    }
  });
  // The second pass calculates dep
  colorConfigs.forEach((config) => {
    const name = config.name;
    if (!isEmptyColor(props[name])) {
      return;
    }
    if (isDepColorConfig(config)) {
      if (config.depType && config.depType === DEP_TYPE.CONTRAST_TEXT) {
        // bgColor is the background color of the container component, equivalent to canvas
        let depKey = config.depName ? res[config.depName] : themeWithDefault[config.depTheme!];
        if (bgColor && config.depTheme === "canvas") {
          depKey = bgColor;
        }
        res[name] = config.transformer(
          depKey,
          themeWithDefault.textDark,
          themeWithDefault.textLight
        );
      } else if (config?.depType === DEP_TYPE.SELF && config.depTheme === "canvas" && bgColor) {
        res[name] = bgColor;
      } else {
        const rest = [];
        config.depName && rest.push(res[config.depName]);
        config.depTheme && rest.push(themeWithDefault[config.depTheme]);
        res[name] = config.transformer(rest[0], rest[1]);
      }
    }
  });
  return res as ColorMap;
}

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  line-height: 1;

  span:nth-of-type(2) {
    cursor: pointer;
    color: #8b8fa3;
    display: inline-flex;
    align-items: center;
  }
`;

const StyleContent = styled.div`
  border: 1.07px solid #d7d9e0;
  border-radius: 6px;

  .cm-editor,
  .cm-editor:hover,
  .cm-editor.cm-focused {
    border: none;
    box-shadow: none;
  }

  > div {
    padding: 1px 0 1px 12px;
    border-bottom: 1px solid #d7d9e0;

    &:hover,
    &:focus {
      background: #fafafa;

      .cm-content {
        background: #fafafa;
      }
    }

    > div {
      align-items: center;
      flex-direction: row;
      gap: 0;

      > div:nth-of-type(1) {
        flex: 0 0 96px;

        div {
          line-height: 30px;
        }
      }

      > svg {
        height: 30px;
      }

      > div:nth-of-type(2) {
        flex: 1 1 auto;
      }
    }
  }

  > div:nth-of-type(1) {
    border-radius: 6px 6px 0 0;
  }

  > div:nth-last-of-type(1) {
    border: none;
    border-radius: 0 0 6px 6px;
  }
`;

const RadiusIcon = styled(IconRadius)` margin: 0 8px 0 -2px;`;
const BorderIcon = styled(BorderWidthIcon)` margin: 0 8px 0 -3px; padding: 3px;`;
const MarginIcon = styled(ExpandIcon)` margin: 0 8px 0 2px;`;
const PaddingIcon = styled(CompressIcon)`	margin: 0 8px 0 2px;`;
const StyledTextSizeIcon = styled(TextSizeIcon)` margin: 0 8px 0 -3px; padding: 3px;`;
const StyledFontFamilyIcon = styled(FontFamilyIcon)` margin: 0 8px 0 -3px; padding: 3px;`;
const StyledTextWeightIcon = styled(TextWeightIcon)` margin: 0 8px 0 -3px; padding: 3px;`;
const StyledBackgroundImageIcon = styled(ImageCompIcon)` margin: 0 0px 0 -12px;`;

const ResetIcon = styled(IconReset)`
  &:hover g g {
    stroke: #315efb;
  }
`;

export function styleControl<T extends readonly SingleColorConfig[]>(colorConfigs: T, label?: string) {
  type ColorMap = { [K in Names<T>]: string };
  const childrenMap: any = {};
  colorConfigs.map((config) => {
    const name: Names<T> = config.name;
    if (
      name === "radius" ||
      name === "borderWidth" ||
      name === "cardRadius" ||
      name === "textSize" ||
      name === "textWeight" ||
      name === "textTransform" ||
      name === "textDecoration" ||
      name === "fontFamily" ||
      name === "fontStyle" ||
      name === "backgroundImage" ||
      name === "backgroundImageRepeat" ||
      name === "backgroundImageSize" ||
      name === "backgroundImagePosition" ||
      name === "backgroundImageOrigin" ||
      name === "headerBackgroundImage" ||
      name === "headerBackgroundImageRepeat" ||
      name === "headerBackgroundImageSize" ||
      name === "headerBackgroundImagePosition" ||
      name === "headerBackgroundImageOrigin" ||
      name === "footerBackgroundImage" ||
      name === "footerBackgroundImageRepeat" ||
      name === "footerBackgroundImageSize" ||
      name === "footerBackgroundImagePosition" ||
      name === "footerBackgroundImageOrigin" ||
      name === "margin" ||
      name === "padding" ||
      name === "containerHeaderPadding" ||
      name === "containerFooterPadding" ||
      name === "containerBodyPadding"
    ) {
      childrenMap[name] = StringControl;
    } else {
      childrenMap[name] = ColorControl;
    }
  });
  // [K in Names<T>]: new (params: CompParams<any>) => ColorControl;
  label = label ?? trans("prop.style");
  return new ControlItemCompBuilder(
    childrenMap as ToConstructor<{ [K in Names<T>]: ColorControl }>,
    (props) => {
      // const x = useContext(CompNameContext);
      const theme = useContext(ThemeContext);
      const bgColor = useContext(BackgroundColorContext);
      return calcColors(props as ColorMap, colorConfigs, theme?.theme, bgColor);
    }
  )
    .setControlItemData({ filterText: label, searchChild: true })
    .setPropertyViewFn((children) => {
      const theme = useContext(ThemeContext);
      const bgColor = useContext(BackgroundColorContext);
      const isMobile = useIsMobile();

      const props = calcColors(
        childrenToProps(children) as ColorMap,
        colorConfigs,
        theme?.theme,
        bgColor
      );
      const showReset = Object.values(childrenToProps(children)).findIndex((item) => item) > -1;
      return (
        <>
          <TitleDiv>
            <span>{label}</span>
            {showReset && (
              <span
                onClick={() => {
                  colorConfigs.map((item) => {
                    const name: Names<T> = item.name;
                    if (
                      name === "radius" ||
                      name === "margin" ||
                      name === "padding" ||
                      name === "containerHeaderPadding" ||
                      name === "containerFooterPadding" ||
                      name === "containerBodyPadding" ||
                      name === "borderWidth" ||
                      name === "backgroundImage" ||
                      name === "backgroundImageRepeat" ||
                      name === "backgroundImageSize" ||
                      name === "backgroundImagePosition" ||
                      name === "backgroundImageOrigin" ||
                      name === "headerBackgroundImage" ||
                      name === "headerBackgroundImageRepeat" ||
                      name === "headerBackgroundImageSize" ||
                      name === "headerBackgroundImagePosition" ||
                      name === "headerBackgroundImageOrigin" ||
                      name === "footerBackgroundImage" ||
                      name === "footerBackgroundImageRepeat" ||
                      name === "footerBackgroundImageSize" ||
                      name === "footerBackgroundImagePosition" ||
                      name === "footerBackgroundImageOrigin"
                    ) {
                      children[name]?.dispatchChangeValueAction("");
                    } else {
                      children[name] &&
                        children[name].dispatch(children[name].changeValueAction(""));
                    }
                  });
                }}
              >
                <Tooltip placement="topRight" title={trans("style.resetTooltip")}>
                  <ResetIcon title="" />
                </Tooltip>
              </span>
            )}
          </TitleDiv>
          <StyleContent>
            {colorConfigs
              .filter(
                (config) =>
                  !config.platform ||
                  (isMobile && config.platform === "mobile") ||
                  (!isMobile && config.platform === "pc")
              )
              .map((config, index) => {
                const name: Names<T> = config.name;
                let depMsg = (config as SimpleColorConfig)["color"];
                if (isDepColorConfig(config)) {
                  if (config.depType === DEP_TYPE.CONTRAST_TEXT) {
                    depMsg = trans("style.contrastText");
                  } else if (config.depType === DEP_TYPE.SELF && config.depTheme) {
                    depMsg = getThemeDetailName(config.depTheme);
                  } else {
                    depMsg = trans("style.generated");
                  }
                }
                return controlItem(
                  { filterText: config.label },
                  <div key={index}>
                    {(name === "radius" ||
                      name === "gap" ||
                      name === "cardRadius")
                      ? (
                        children[name] as InstanceType<typeof StringControl>
                      ).propertyView({
                        label: config.label,
                        preInputNode: <RadiusIcon title="Radius" />,
                        placeholder: props[name],
                      })
                      : name === "borderWidth"
                        ? (
                          children[name] as InstanceType<typeof StringControl>
                        ).propertyView({
                          label: config.label,
                          preInputNode: <BorderIcon title="Border-Width" />,
                          placeholder: props[name],
                        })
                        : name === "margin"
                          ? (
                            children[name] as InstanceType<typeof StringControl>
                          ).propertyView({
                            label: config.label,
                            preInputNode: <MarginIcon title="Margin" />,
                            placeholder: props[name],
                          })
                          : (name === "padding" ||
                            name === "containerheaderpadding" ||
                            name === "containerfooterpadding" ||
                            name === "containerbodypadding")
                            ? (
                              children[name] as InstanceType<typeof StringControl>
                            ).propertyView({
                              label: config.label,
                              preInputNode: <PaddingIcon title="Padding" />,
                              placeholder: props[name],
                            })
                            : name === "textSize" ||
                              name === "padding" ||
                              name === "containerHeaderPadding" ||
                              name === "containerFooterPadding" ||
                              name === "containerBodyPadding"
                              ? (
                                children[name] as InstanceType<typeof StringControl>
                              ).propertyView({
                                label: config.label,
                                preInputNode: <StyledTextSizeIcon title="Font Size" />,
                                placeholder: props[name],
                              })
                              : name === "textWeight"
                                ? (
                                  children[name] as InstanceType<typeof StringControl>
                                ).propertyView({
                                  label: config.label,
                                  preInputNode: <StyledTextWeightIcon title="Font Weight" />,
                                  placeholder: props[name],
                                })
                                : name === "fontFamily"
                                  ? (
                                    children[name] as InstanceType<typeof StringControl>
                                  ).propertyView({
                                    label: config.label,
                                    preInputNode: <StyledFontFamilyIcon title="Font Family" />,
                                    placeholder: props[name],
                                  })
                                  : name === "fontStyle"
                                    ? (
                                      children[name] as InstanceType<typeof StringControl>
                                    ).propertyView({
                                      label: config.label,
                                      preInputNode: <StyledFontFamilyIcon title="Font Style" />,
                                      placeholder: props[name],
                                    })
                                    : name === "backgroundImage" || name === "headerBackgroundImage" || name === "footerBackgroundImage"
                                      ? (
                                        children[name] as InstanceType<typeof StringControl>
                                      ).propertyView({
                                        label: config.label,
                                        preInputNode: <StyledBackgroundImageIcon title="Background Image" />,
                                        placeholder: props[name],
                                      })
                                      : name === "backgroundImageRepeat" || name === "headerBackgroundImageRepeat" || name === "footerBackgroundImageRepeat"
                                        ? (
                                          children[name] as InstanceType<typeof StringControl>
                                        ).propertyView({
                                          label: config.label,
                                          preInputNode: <StyledBackgroundImageIcon title="Background Image Repeat" />,
                                          placeholder: props[name],
                                        })
                                        : name === "backgroundImageSize" || name === "headerBackgroundImageSize" || name === "footerBackgroundImageSize"
                                          ? (
                                            children[name] as InstanceType<typeof StringControl>
                                          ).propertyView({
                                            label: config.label,
                                            preInputNode: <StyledBackgroundImageIcon title="Background Image Size" />,
                                            placeholder: props[name],
                                          })
                                          : name === "backgroundImagePosition" || name === "headerBackgroundImagePosition" || name === "footerBackgroundImagePosition"
                                            ? (
                                              children[name] as InstanceType<typeof StringControl>
                                            ).propertyView({
                                              label: config.label,
                                              preInputNode: <StyledBackgroundImageIcon title="Background Image Position" />,
                                              placeholder: props[name],
                                            })
                                            : name === "backgroundImageOrigin" || name === "headerBackgroundImageOrigin" || name === "footerBackgroundImageOrigin"
                                              ? (
                                                children[name] as InstanceType<typeof StringControl>
                                              ).propertyView({
                                                label: config.label,
                                                preInputNode: <StyledBackgroundImageIcon title="Background Image Origin" />,
                                                placeholder: props[name],
                                              })
                                              : children[name].propertyView({
                                                label: config.label,
                                                panelDefaultColor: props[name],
                                                // isDep: isDepColorConfig(config),	
                                                isDep: true,
                                                depMsg: depMsg,
                                              })

                    }

                  </div>
                );
              })}
          </StyleContent>
        </>
      );
    })
    .build();
}

export function useStyle<T extends readonly SingleColorConfig[]>(colorConfigs: T) {
  const theme = useContext(ThemeContext);
  const bgColor = useContext(BackgroundColorContext);
  type ColorMap = { [K in Names<T>]: string };
  const props = {} as ColorMap;
  colorConfigs.forEach((config) => {
    props[config.name as Names<T>] = "";
  });
  return calcColors(props, colorConfigs, theme?.theme, bgColor);
}
