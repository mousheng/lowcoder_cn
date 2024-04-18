import { ThemeDetail } from "api/commonSettingApi";
import { darkenColor, isDarkColor, lightenColor, toHex } from "lowcoder-design";
import { trans } from "i18n";
import { StyleConfigType } from "./styleControl";

type SupportPlatform = "pc" | "mobile";

type CommonColorConfig = {
  readonly name: string;
  readonly label: string;
  readonly platform?: SupportPlatform; // support all if undefined
  readonly defaultValue?: string; // added by mousheng 用于设置非主题内置属性的默认值
};

export type SimpleColorConfig = CommonColorConfig & {
  readonly color: string;
};

export type RadiusConfig = CommonColorConfig & {
  readonly radius: string;
};

export type BorderWidthConfig = CommonColorConfig & {
  readonly borderWidth: string;
};

export type BackgroundImageConfig = CommonColorConfig & { readonly backgroundImage: string; };
export type BackgroundImageRepeatConfig = CommonColorConfig & { readonly backgroundImageRepeat: string; };
export type BackgroundImageSizeConfig = CommonColorConfig & { readonly backgroundImageSize: string; };
export type BackgroundImagePositionConfig = CommonColorConfig & { readonly backgroundImagePosition: string; };
export type BackgroundImageOriginConfig = CommonColorConfig & { readonly backgroundImageOrigin: string; };

export type HeaderBackgroundImageConfig = CommonColorConfig & { readonly headerBackgroundImage: string; };
export type HeaderBackgroundImageRepeatConfig = CommonColorConfig & { readonly headerBackgroundImageRepeat: string; };
export type HeaderBackgroundImageSizeConfig = CommonColorConfig & { readonly headerBackgroundImageSize: string; };
export type HeaderBackgroundImagePositionConfig = CommonColorConfig & { readonly headerBackgroundImagePosition: string; };
export type HeaderBackgroundImageOriginConfig = CommonColorConfig & { readonly headerBackgroundImageOrigin: string; };

export type FooterBackgroundImageConfig = CommonColorConfig & { readonly footerBackgroundImage: string; };
export type FooterBackgroundImageRepeatConfig = CommonColorConfig & { readonly footerBackgroundImageRepeat: string; };
export type FooterBackgroundImageSizeConfig = CommonColorConfig & { readonly footerBackgroundImageSize: string; };
export type FooterBackgroundImagePositionConfig = CommonColorConfig & { readonly footerBackgroundImagePosition: string; };
export type FooterBackgroundImageOriginConfig = CommonColorConfig & { readonly footerBackgroundImageOrigin: string; };

export type TextSizeConfig = CommonColorConfig & {
  readonly textSize: string;
};

export type TextWeightConfig = CommonColorConfig & {
  readonly textWeight: string;
};

export type FontFamilyConfig = CommonColorConfig & {
  readonly fontFamily: string;
};

export type FontStyleConfig = CommonColorConfig & {
  readonly fontStyle: string;
}

export type borderStyleConfig = CommonColorConfig & {
  readonly borderStyle: string;
}

export type ContainerHeaderPaddingConfig = CommonColorConfig & {
  readonly containerHeaderPadding: string;

};

export type ContainerBodyPaddingConfig = CommonColorConfig & {
  readonly containerBodyPadding: string;
};

export type ContainerFooterPaddingConfig = CommonColorConfig & {
  readonly containerFooterPadding: string;
};

export type MarginConfig = CommonColorConfig & {
  readonly margin: string;
};

export type PaddingConfig = CommonColorConfig & {
  readonly padding: string;
};

export type TextTransformConfig = CommonColorConfig & {
  readonly textTransform: string;
}

export type TextDecorationConfig = CommonColorConfig & {
  readonly textDecoration: string;
}

export type DepColorConfig = CommonColorConfig & {
  readonly depName?: string;
  readonly depTheme?: keyof ThemeDetail;
  readonly depType?: DEP_TYPE;
  transformer: (color: string, ...rest: string[]) => string;
};

export type SingleColorConfig = SimpleColorConfig | DepColorConfig | RadiusConfig | BorderWidthConfig | borderStyleConfig | BackgroundImageConfig | BackgroundImageRepeatConfig | BackgroundImageSizeConfig | BackgroundImagePositionConfig | BackgroundImageOriginConfig | TextSizeConfig | TextWeightConfig | TextTransformConfig | TextDecorationConfig | FontFamilyConfig | FontStyleConfig | MarginConfig | PaddingConfig | ContainerHeaderPaddingConfig | ContainerFooterPaddingConfig | ContainerBodyPaddingConfig | HeaderBackgroundImageConfig | HeaderBackgroundImageRepeatConfig | HeaderBackgroundImageSizeConfig | HeaderBackgroundImagePositionConfig | HeaderBackgroundImageOriginConfig | FooterBackgroundImageConfig | FooterBackgroundImageRepeatConfig | FooterBackgroundImageSizeConfig | FooterBackgroundImagePositionConfig | FooterBackgroundImageOriginConfig;

export const defaultTheme: ThemeDetail = {
  primary: "#3377FF",
  textDark: "#222222",
  textLight: "#FFFFFF",
  canvas: "#F5F5F6",
  primarySurface: "#FFFFFF",
  borderRadius: "4px",
  margin: "0px",	
  padding: "0px",
  gridColumns: "24",
  textSize: "14px",
};

export const SURFACE_COLOR = "#FFFFFF";
const SECOND_SURFACE_COLOR = "#D7D9E0";
const ERROR_COLOR = "#F5222D";
const SUCCESS_COLOR = "#079968";

export enum DEP_TYPE {
  CONTRAST_TEXT = "contrastText",
  SELF = "toSelf",
}

export function contrastText(color: string, textDark: string, textLight: string) {
  return isDarkColor(color) && color !== '#00000000' ? textLight : textDark;
}

// return similar background color
export function contrastBackground(color: string, amount: number = 0.05) {
  if (isDarkColor(color)) {
    return lightenColor(color, amount);
  } else {
    return darkenColor(color, amount);
  }
}

// return contrast color
export function contrastColor(color: string) {
  if (isDarkColor(color)) {
    return lightenColor(color, 0.2);
  } else {
    return darkenColor(color, 0.1);
  }
}

// return dependent color
function toSelf(color: string) {
  return color;
}

// Background color generates border. To be optimized
export function backgroundToBorder(color: string) {
  if (toHex(color) === SURFACE_COLOR) {
    return SECOND_SURFACE_COLOR;
  }
  return darkenColor(color, 0.03);
}

// calendar background color to border
export function calendarBackgroundToBorder(color: string) {
  if (toHex(color) === SURFACE_COLOR) {
    return SECOND_SURFACE_COLOR;
  }
  return darkenColor(color, 0.12);
}

// return switch unchecked color
function handleToUnchecked(color: string) {
  if (toHex(color) === SURFACE_COLOR) {
    return SECOND_SURFACE_COLOR;
  }
  return contrastBackground(color);
}

// return segmented background
function handleToSegmentBackground(color: string) {
  if (toHex(color) === SURFACE_COLOR) {
    return "#E1E3EB";
  }
  return contrastBackground(color);
}

// return table hover row background color
export function handleToHoverRow(color: string) {
  if (isDarkColor(color)) {
    return "#FFFFFF23";
  } else {
    return "#00000007";
  }
}

// return table select row background color
export function handleToSelectedRow(color: string, primary: string = defaultTheme.primary) {
  if (toHex(color) === SURFACE_COLOR) {
    return `${toHex(primary)?.substring(0, 7)}16`;
  } else if (isDarkColor(color)) {
    return "#FFFFFF33";
  } else {
    return "#00000011";
  }
}

// return table header background color
export function handleToHeadBg(color: string) {
  if (toHex(color) === SURFACE_COLOR) {
    return darkenColor(color, 0.06);
  }
  if (toHex(color) === "#000000") {
    return SECOND_SURFACE_COLOR;
  }
  if (isDarkColor(color)) {
    return darkenColor(color, 0.06);
  } else {
    return lightenColor(color, 0.015);
  }
}

// return divider text color
function handleToDividerText(color: string) {
  return darkenColor(color, 0.4);
}

// return calendar select background color
function handleCalendarSelectColor(color: string) {
  return lightenColor(color, 0.3) + "4C";
}

// return lighten color
function handleLightenColor(color: string) {
  return lightenColor(color, 0.1);
}

// return calendar head button select background
export function handleToCalendarHeadSelectBg(color: string) {
  if (toHex(color) === SURFACE_COLOR) {
    return "#E1E3EB";
  }
  return contrastBackground(color, 0.15);
}

// return calendar today background
export function handleToCalendarToday(color: string) {
  if (isDarkColor(color)) {
    return "#FFFFFF33";
  } else {
    return "#0000000c";
  }
}

// return calendar text
function handleCalendarText(color: string, textDark: string, textLight: string) {
  return isDarkColor(color) ? textLight : lightenColor(textDark, 0.1);
}

const TEXT = {
  name: "text",
  label: trans("text"),
  depName: "background",
  depType: DEP_TYPE.CONTRAST_TEXT,
  transformer: contrastText,
} as const;

const STATIC_TEXT = {
  name: "staticText",
  label: trans("style.staticText"),
  depTheme: "canvas",
  depType: DEP_TYPE.CONTRAST_TEXT,
  transformer: contrastText,
} as const;

const LABEL = {
  name: "label",
  label: trans("label"),
  depTheme: "canvas",
  depType: DEP_TYPE.CONTRAST_TEXT,
  transformer: contrastText,
} as const;

const ACCENT = {
  name: "accent",
  label: trans("style.accent"),
  depTheme: "primary",
  depType: DEP_TYPE.SELF,
  transformer: toSelf,
  platform: "pc",
} as const;

const VALIDATE = {
  name: "validate",
  label: trans("style.validate"),
  color: ERROR_COLOR,
} as const;

const ACCENT_VALIDATE = [ACCENT, VALIDATE] as const;

const BORDER = {
  name: "border",
  label: trans("style.border"),
  depName: "background",
  transformer: backgroundToBorder,
} as const;

const RADIUS = {
  name: "radius",
  label: trans("style.borderRadius"),
  radius: "borderRadius",
} as const;

const BORDER_WIDTH = {
  name: "borderWidth",
  label: trans("style.borderWidth"),
  borderWidth: "borderWidth",
} as const;

const BACKGROUND_IMAGE = {
  name: "backgroundImage",
  label: trans("style.backgroundImage"),
  backgroundImage: "backgroundImage",
} as const;

const BACKGROUND_IMAGE_REPEAT = {
  name: "backgroundImageRepeat",
  label: trans("style.backgroundImageRepeat"),
  backgroundImageRepeat: "backgroundImageRepeat",
} as const;

const BACKGROUND_IMAGE_SIZE = {
  name: "backgroundImageSize",
  label: trans("style.backgroundImageSize"),
  backgroundImageSize: "backgroundImageSize",
} as const;

const BACKGROUND_IMAGE_POSITION = {
  name: "backgroundImagePosition",
  label: trans("style.backgroundImagePosition"),
  backgroundImagePosition: "backgroundImagePosition",
} as const;

const BACKGROUND_IMAGE_ORIGIN = {
  name: "backgroundImageOrigin",
  label: trans("style.backgroundImageOrigin"),
  backgroundImageOrigin: "backgroundImageOrigin",
} as const;

const MARGIN = {
  name: "margin",
  label: trans("style.margin"),
  margin: "margin",
} as const;

const PADDING = {
  name: "padding",
  label: trans("style.padding"),
  padding: "padding",
} as const;

const TEXT_SIZE = {
  name: "textSize",
  label: trans("style.textSize"),
  textSize: "textSize",
} as const;

const TEXT_WEIGHT = {
  name: "textWeight",
  label: trans("style.textWeight"),
  textWeight: "textWeight",
} as const;

const HOVER_BACKGROUND_COLOR = {
  name: "hoverBackground",
  label: trans("style.hoverBackground"),
  hoverBackground: "hoverBackground"
}

const FONT_FAMILY = {
  name: "fontFamily",
  label: trans("style.fontFamily"),
  fontFamily: "fontFamily",
} as const;

const FONT_STYLE = {
  name: "fontStyle",
  label: trans("style.fontStyle"),
  fontStyle: "fontStyle",
} as const

const CONTAINER_HEADER_PADDING = {
  name: "containerHeaderPadding",
  label: trans("style.containerHeaderPadding"),
  containerHeaderPadding: "padding",
} as const;

const CONTAINER_FOOTER_PADDING = {
  name: "containerFooterPadding",
  label: trans("style.containerFooterPadding"),
  containerFooterPadding: "padding",
} as const;

const CONTAINER_BODY_PADDING = {
  name: "containerBodyPadding",
  label: trans("style.containerBodyPadding"),
  containerBodyPadding: "padding",
} as const;

const TEXT_TRANSFORM = {
  name: "textTransform",
  label: trans("style.textTransform"),
  textTransform: "textTransform"
}

const TEXT_DECORATION = {
  name: "textDecoration",
  label: trans("style.textDecoration"),
  textDecoration: "textDecoration"
}

const getStaticBorder = (color: string = SECOND_SURFACE_COLOR) =>
({
  name: "border",
  label: trans("style.border"),
  color,
} as const);

const HEADER_BACKGROUND = {
  name: "headerBackground",
  label: trans("style.headerBackground"),
  depName: "background",
  depType: DEP_TYPE.SELF,
  transformer: toSelf,
} as const;

const BG_STATIC_BORDER_RADIUS = [getBackground(), getStaticBorder(), RADIUS] as const;
const STYLING_FIELDS_SEQUENCE = [
  TEXT,
  TEXT_TRANSFORM,
  TEXT_DECORATION,
  TEXT_SIZE,
  TEXT_WEIGHT,
  FONT_FAMILY,
  FONT_STYLE,
  BORDER,
  MARGIN,
  PADDING,
  RADIUS,
  BORDER_WIDTH,
]

const FILL = {
  name: "fill",
  label: trans("style.fill"),
  depTheme: "primary",
  depType: DEP_TYPE.SELF,
  transformer: toSelf,
} as const;

const TRACK = {
  name: "track",
  label: trans("style.track"),
  color: SECOND_SURFACE_COLOR,
} as const;

const SUCCESS = {
  name: "success",
  label: trans("success"),
  color: SUCCESS_COLOR,
} as const;

function getStaticBgBorderRadiusByBg(background: string, platform?: SupportPlatform) {
  return [
    getStaticBackground(background),
    platform ? { ...BORDER, platform } : BORDER,
    platform ? { ...RADIUS, platform } : RADIUS,
  ] as const;
}

function getBgBorderRadiusByBg(background: keyof ThemeDetail = "primarySurface") {
  return [getBackground(background), BORDER, RADIUS, PADDING] as const;
}

function getBgBorderRadiusByBg2(background: keyof ThemeDetail = "primarySurface") {
  return [getBackground(background), BORDER, RADIUS] as const;
}

function getBackground(depTheme: keyof ThemeDetail = "primarySurface") {
  return {
    name: "background",
    label: trans("style.background"),
    depTheme: depTheme,
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  } as const;
}

function getStaticBackground(color: string) {
  return {
    name: "background",
    label: trans("style.background"),
    color,
  } as const;
}

function replaceAndMergeMultipleStyles(originalArray: any[], styleToReplace: string, replacingStyles: any[]): any[] {
  let temp = []
  let foundIndex = originalArray.findIndex((element) => element.name === styleToReplace)

  if (foundIndex !== -1) {
    let elementsBeforeFoundIndex = originalArray.filter((item, index) => index < foundIndex)
    let elementsAfterFoundIndex = originalArray.filter((item, index) => index > foundIndex)
    temp = [...elementsBeforeFoundIndex, ...replacingStyles, ...elementsAfterFoundIndex]
  } else
    temp = [...originalArray]

  return temp
}

export const ButtonStyle = [
  getBackground('primary'),
  ...STYLING_FIELDS_SEQUENCE
] as const;

export const ToggleButtonStyle = [
  getBackground("canvas"),
  ...STYLING_FIELDS_SEQUENCE.map((style) => {
    if (style.name === 'border') {
      return {
        ...style,
        depType: DEP_TYPE.SELF,
        transformer: toSelf
      }
    }
    return {
      ...style
    }
  })
] as const;

export const TextStyle = [
  {
    name: "background",
    label: trans("style.background"),
    depTheme: "canvas",
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  },
  ...STYLING_FIELDS_SEQUENCE,
  {
    name: "links",
    label: trans("style.links"),
    depTheme: "primary",
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  },
] as const;

export const MarginStyle = [
  {
    name: "margin",
    label: trans("style.margin"),
    margin: "margin",
  },
];

export const ContainerStyle = [
  // ...BG_STATIC_BORDER_RADIUS,
  getStaticBorder(),
  // ...STYLING_FIELDS_SEQUENCE.filter((style) => style.name !== 'border'),
  getBackground(),
  RADIUS,
  BORDER_WIDTH,
  MARGIN,
  PADDING,
  {
    name: "backgroundImage",
    label: trans("style.backgroundImage"),
    backgroundImage: "backgroundImage",
  },
  {
    name: "backgroundImageRepeat",
    label: trans("style.backgroundImageRepeat"),
    backgroundImageRepeat: "backgroundImageRepeat",
  },
  {
    name: "backgroundImageSize",
    label: trans("style.backgroundImageSize"),
    backgroundImageSize: "backgroundImageSize",
  },
  {
    name: "backgroundImagePosition",
    label: trans("style.backgroundImagePosition"),
    backgroundImagePosition: "backgroundImagePosition",
  },
  {
    name: "backgroundImageOrigin",
    label: trans("style.backgroundImageOrigin"),
    backgroundImageOrigin: "backgroundImageOrigin",
  },
] as const;

export const ContainerHeaderStyle = [
  CONTAINER_HEADER_PADDING,
  HEADER_BACKGROUND,
  {
    name: "headerBackgroundImage",
    label: trans("style.backgroundImage"),
    headerBackgroundImage: "headerBackgroundImage",
  },
  {
    name: "headerBackgroundImageRepeat",
    label: trans("style.backgroundImageRepeat"),
    headerBackgroundImageRepeat: "headerBackgroundImageRepeat",
  },
  {
    name: "headerBackgroundImageSize",
    label: trans("style.backgroundImageSize"),
    headerBackgroundImageSize: "headerBackgroundImageSize",
  },
  {
    name: "headerBackgroundImagePosition",
    label: trans("style.backgroundImagePosition"),
    headerBackgroundImagePosition: "headerBackgroundImagePosition",
  }
  , {
    name: "headerBackgroundImageOrigin",
    label: trans("style.backgroundImageOrigin"),
    headerBackgroundImageOrigin: "headerBackgroundImageOrigin",
  },
] as const;

export const ContainerBodyStyle = [
  CONTAINER_BODY_PADDING,
  {
    name: "background",
    label: trans("style.background"),
    depName: "background",
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  },
  {
    name: "backgroundImage",
    label: trans("style.backgroundImage"),
    backgroundImage: "backgroundImage",
  },
  {
    name: "backgroundImageRepeat",
    label: trans("style.backgroundImageRepeat"),
    backgroundImageRepeat: "backgroundImageRepeat",
  },
  {
    name: "backgroundImageSize",
    label: trans("style.backgroundImageSize"),
    backgroundImageSize: "backgroundImageSize",
  },
  {
    name: "backgroundImagePosition",
    label: trans("style.backgroundImagePosition"),
    backgroundImagePosition: "backgroundImagePosition",
  },
  {
    name: "backgroundImageOrigin",
    label: trans("style.backgroundImageOrigin"),
    backgroundImageOrigin: "backgroundImageOrigin",
  },
] as const;

export const ContainerFooterStyle = [
  CONTAINER_FOOTER_PADDING,
  {
    name: "footerBackground",
    label: trans("style.background"),
    depName: "background",
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  },
  {
    name: "footerBackgroundImage",
    label: trans("style.backgroundImage"),
    footerBackgroundImage: "footerBackgroundImage",
  },
  {
    name: "footerBackgroundImageRepeat",
    label: trans("style.backgroundImageRepeat"),
    footerBackgroundImageRepeat: "footerBackgroundImageRepeat",
  },
  {
    name: "footerBackgroundImageSize",
    label: trans("style.backgroundImageSize"),
    footerBackgroundImageSize: "footerBackgroundImageSize",
  },
  {
    name: "footerBackgroundImagePosition",
    label: trans("style.backgroundImagePosition"),
    footerBackgroundImagePosition: "footerBackgroundImagePosition",
  }
  , {
    name: "footerBackgroundImageOrigin",
    label: trans("style.backgroundImageOrigin"),
    footerBackgroundImageOrigin: "footerBackgroundImageOrigin",
  }
] as const;

export const SliderStyle = [
  LABEL,
  FILL,
  {
    name: "thumbBorder",
    label: trans("style.thumbBorder"),
    depName: "fill",
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  },
  {
    name: "thumb",
    label: trans("style.thumb"),
    color: SURFACE_COLOR,
  },
  TRACK,
  MARGIN,
  PADDING,
] as const;

export const InputLikeStyle = [
  LABEL,
  getStaticBackground(SURFACE_COLOR),
  ...STYLING_FIELDS_SEQUENCE,
  ...ACCENT_VALIDATE,
] as const;

export const ColorPickerStyle = [
  LABEL,
  getStaticBackground(SURFACE_COLOR),
  ...STYLING_FIELDS_SEQUENCE,
  ...ACCENT_VALIDATE,
] as const;

export const RatingStyle = [
  LABEL,
  {
    name: "checked",
    label: trans("style.checked"),
    color: "#FFD400",
  },
  {
    name: "unchecked",
    label: trans("style.unchecked"),
    color: SECOND_SURFACE_COLOR,
  },
  MARGIN,
  PADDING,
] as const;

export const SwitchStyle = [
  LABEL,
  {
    name: "handle",
    label: trans("style.handle"),
    color: SURFACE_COLOR,
  },
  {
    name: "unchecked",
    label: trans("style.unchecked"),
    depName: "handle",
    transformer: handleToUnchecked,
  },
  {
    name: "checked",
    label: trans("style.checked"),
    depTheme: "primary",
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  },
  MARGIN,
  PADDING,
] as const;

export const SelectStyle = [
  ...replaceAndMergeMultipleStyles(STYLING_FIELDS_SEQUENCE, 'border', [...getStaticBgBorderRadiusByBg(SURFACE_COLOR, "pc")]),
  ...ACCENT_VALIDATE,
] as const;

const multiSelectCommon = [
  ...replaceAndMergeMultipleStyles(STYLING_FIELDS_SEQUENCE, 'border', [...getStaticBgBorderRadiusByBg(SURFACE_COLOR, "pc")]),
  {
    name: "tags",
    label: trans("style.tags"),
    color: "#F5F5F6",
    platform: "pc",
  },
  {
    name: "tagsText",
    label: trans("style.tagsText"),
    depName: "tags",
    depType: DEP_TYPE.CONTRAST_TEXT,
    transformer: contrastText,
    platform: "pc",
  },
] as const;

export const MultiSelectStyle = [
  ...multiSelectCommon,
  {
    name: "multiIcon",
    label: trans("style.multiIcon"),
    depTheme: "primary",
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
    platform: "pc",
  },
  ...ACCENT_VALIDATE,
] as const;

export const TabContainerStyle = [
  // Keep background related properties of container as STYLING_FIELDS_SEQUENCE has rest of the properties
  ...replaceAndMergeMultipleStyles([...ContainerStyle.filter((style)=> ['border','radius','borderWidth','margin','padding'].includes(style.name) === false),...STYLING_FIELDS_SEQUENCE], 'text', [{
    name: "tabText",
    label: trans("style.tabText"),
    depName: "headerBackground",
    depType: DEP_TYPE.CONTRAST_TEXT,
    transformer: contrastText,
  },]),
  {
    name: "activeColor",
    label: trans("style.tabActiveColor"),
    depTheme: "primarySurface",
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  },
  {
    name: "accent",
    label: trans("style.tabAccent"),
    depTheme: "primary",
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  },
  CONTAINER_BODY_PADDING,
  ...ContainerStyle,
] as const;

export const ModalStyle = [
  ...getBgBorderRadiusByBg(),
  BORDER_WIDTH,
  MARGIN,
  BACKGROUND_IMAGE,
  BACKGROUND_IMAGE_REPEAT,
  BACKGROUND_IMAGE_SIZE,
  BACKGROUND_IMAGE_POSITION,
  BACKGROUND_IMAGE_ORIGIN
] as const;

export const CascaderStyle = [
  LABEL,
  ...getStaticBgBorderRadiusByBg(SURFACE_COLOR, "pc"),
  TEXT,
  ACCENT,
  MARGIN,
  PADDING,
] as const;

function checkAndUncheck() {
  return [
    {
      name: "checkedBackground",
      label: trans("style.checkedBackground"),
      depTheme: "primary",
      depType: DEP_TYPE.SELF,
      transformer: toSelf,
    },
    {
      name: "uncheckedBackground",
      label: trans("style.uncheckedBackground"),
      color: SURFACE_COLOR,
    },
    {
      name: "uncheckedBorder",
      label: trans("style.uncheckedBorder"),
      depName: "uncheckedBackground",
      transformer: backgroundToBorder,
    },
  ] as const;
}

export const CheckboxStyle = [
  ...replaceAndMergeMultipleStyles(STYLING_FIELDS_SEQUENCE, 'text', [LABEL, STATIC_TEXT, VALIDATE]).filter((style) => style.name !== 'border'),
  ...checkAndUncheck(),
  {
    name: "checked",
    label: trans("style.checked"),
    depName: "checkedBackground",
    depType: DEP_TYPE.CONTRAST_TEXT,
    transformer: contrastText,
  },
  HOVER_BACKGROUND_COLOR
] as const;

export const RadioStyle = [
  ...replaceAndMergeMultipleStyles(STYLING_FIELDS_SEQUENCE, 'text', [LABEL, STATIC_TEXT, VALIDATE]).filter((style) => style.name !== 'border' && style.name !== 'radius'),
  ...checkAndUncheck(),
  {
    name: "checked",
    label: trans("style.checked"),
    depName: "uncheckedBackground",
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  },
  HOVER_BACKGROUND_COLOR
] as const;

export const SegmentStyle = [
  LABEL,
  ...STYLING_FIELDS_SEQUENCE.filter((style)=> ['border','borderWidth'].includes(style.name) === false),
  {
    name: "indicatorBackground",
    label: trans("style.indicatorBackground"),
    color: SURFACE_COLOR,
  },
  {
    name: "background",
    label: trans("style.background"),
    depName: "indicatorBackground",
    transformer: handleToSegmentBackground,
  },
  {
    name: "text",
    label: trans("text"),
    depName: "indicatorBackground",
    depType: DEP_TYPE.CONTRAST_TEXT,
    transformer: contrastText,
  },
  VALIDATE,
] as const;

const LinkTextStyle = [
  {
    name: "text",
    label: trans("text"),
    depTheme: "primary",
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  },
  {
    name: "hoverText",
    label: "Hover text", // trans("style.hoverRowBackground"),
    depName: "text",
    transformer: handleToHoverLink,
  },
  {
    name: "activeText",
    label: "Active text", // trans("style.hoverRowBackground"),
    depName: "text",
    transformer: handleToHoverLink,
  },
] as const;

export const TableStyle = [
  MARGIN,
  PADDING,
  ...BG_STATIC_BORDER_RADIUS,
  {
    name: "borderWidth",
    label: trans("style.borderWidth"),
    borderWidth: "borderWidth",
  },
] as const;

export const TableToolbarStyle = [
  MARGIN,
  getBackground(),
  getStaticBorder(),
  {
    name: "toolbarText",
    label: trans("style.toolbarText"),
    depName: "toolbarBackground",
    depType: DEP_TYPE.CONTRAST_TEXT,
    transformer: toSelf,
  },
] as const;

export const TableHeaderStyle = [
  MARGIN,
  PADDING,
  FONT_FAMILY,
  FONT_STYLE,
  TEXT,
  {
    name: "headerBackground",
    label: trans("style.tableHeaderBackground"),
    depName: "headerBackground",
    transformer: handleToHeadBg,
  },
  getStaticBorder(),
  {
    name: "borderWidth",
    label: trans("style.borderWidth"),
    borderWidth: "borderWidth",
  },
  {
    name: "headerText",
    label: trans("style.tableHeaderText"),
    depName: "headerBackground",
    depType: DEP_TYPE.CONTRAST_TEXT,
    transformer: contrastText,
  },
  TEXT_SIZE,
  TEXT_WEIGHT,
  FONT_FAMILY,
] as const;

export const TableRowStyle = [
  getBackground(),
  {
    name: "selectedRowBackground",
    label: trans("style.selectedRowBackground"),
    depName: "background",
    depTheme: "primary",
    transformer: handleToSelectedRow,
  },
  {
    name: "hoverRowBackground",
    label: trans("style.hoverRowBackground"),
    depName: "background",
    transformer: handleToHoverRow,
  },
  {
    name: "alternateBackground",
    label: trans("style.alternateRowBackground"),
    depName: "background",
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  },
] as const;

export const TableColumnStyle = [
  getStaticBackground("#00000000"),
  getStaticBorder(),
  MARGIN,
  BORDER_WIDTH,
  RADIUS,
  TEXT,
  TEXT_SIZE,
  TEXT_WEIGHT,
  FONT_FAMILY,
  FONT_STYLE,
] as const;

export const TableColumnLinkStyle = [
  ...LinkTextStyle,
] as const;

export const FileStyle = [
  // ...getStaticBgBorderRadiusByBg(SURFACE_COLOR),
  getStaticBackground(SURFACE_COLOR),
  ...replaceAndMergeMultipleStyles(STYLING_FIELDS_SEQUENCE, 'border', [getStaticBorder('#00000000')]),
  // TEXT, ACCENT, MARGIN, PADDING
] as const;

export const FileViewerStyle = [
  getStaticBackground("#FFFFFF"),
  getStaticBorder("#00000000"),
  RADIUS,
  MARGIN,
  PADDING,
  BORDER_WIDTH
] as const;

export const IframeStyle = [getBackground(), getStaticBorder("#00000000"), RADIUS, BORDER_WIDTH, MARGIN, PADDING] as const;

export const DateTimeStyle = [
  LABEL,
  ...getStaticBgBorderRadiusByBg(SURFACE_COLOR),
  TEXT,
  MARGIN,
  PADDING,
  ...ACCENT_VALIDATE,
] as const;

function handleToHoverLink(color: string) {
  if (isDarkColor(color)) {
    return "#FFFFFF23";
  } else {
    return "#00000007";
  }
}

export const LinkStyle = [

  {
    name: "background",
    label: trans("style.background"),
    depTheme: "canvas",
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  },
  ...replaceAndMergeMultipleStyles(STYLING_FIELDS_SEQUENCE, 'text', [...LinkTextStyle])
] as const;

export const DividerStyle = [
  {
    name: "color",
    label: trans("color"),
    color: lightenColor(SECOND_SURFACE_COLOR, 0.05),
  },
  ...STYLING_FIELDS_SEQUENCE.map((style) => {
    if (style.name === 'text') {
      return {
        name: "text",
        label: trans("text"),
        depName: "color",
        transformer: handleToDividerText,
      }
    }else if(style.name === 'borderWidth'){
      return {
        name: "borderWidth",
        label: trans("style.borderWidth"),
        borderWidth: "borderWidth",
        defaultValue: "1px"
      }
    }
    return style
  })
] as const;

// Hidden border and borderWidth properties as AntD doesnt allow these properties for progress bar
export const ProgressStyle = [
  ...replaceAndMergeMultipleStyles(STYLING_FIELDS_SEQUENCE, 'text', [{
    name: "text",
    label: trans("text"),
    depTheme: "canvas",
    depType: DEP_TYPE.CONTRAST_TEXT,
    transformer: contrastText,
  }]).filter((style) => ['border', 'borderWidth', 'textTransform', 'textDecoration'].includes(style.name) === false),
  TRACK,
  FILL,
  SUCCESS,
] as const;

export const CircleProgressStyle = [...ProgressStyle.filter((style) => style.name !== 'radius')]

export const NavigationStyle =[ ...replaceAndMergeMultipleStyles(STYLING_FIELDS_SEQUENCE, 'text', [
  {
    name: "text",
    label: trans("text"),
    depName: "background",
    depType: DEP_TYPE.CONTRAST_TEXT,
    transformer: contrastText,
  },
  ACCENT,
  getStaticBackground("#FFFFFF00")
])
// {
//   name: "text",
//   label: trans("text"),
//   depName: "background",
//   depType: DEP_TYPE.CONTRAST_TEXT,
//   transformer: contrastText,
// },
// ACCENT,
// getStaticBackground("#FFFFFF00"),
// getStaticBorder("#FFFFFF00"),
// MARGIN,
// PADDING,
// FONT_FAMILY,
// FONT_STYLE,
// TEXT_WEIGHT,
// TEXT_SIZE,
// BORDER_WIDTH
] as const;

export const AntLayoutLogoStyle = [
  {
    name: "containerColor",
    label: trans("antLayoutComp.containerColor"),
    color: '#ffffff',
  },
  {
    name: "color",
    label: trans("antLayoutComp.logoIconColor"),
    color: "#5589F2",
  },
  getStaticBackground("#FFFFFF00"),
  TEXT_SIZE,
  {
    name: "fontColor",
    label: trans("antLayoutComp.fontColor"),
    color: "#000000",
  },
] as const;

export const AntLayoutFramerStyle = [
  getStaticBackground("#FFFFFFFF"),
  getStaticBorder("#FFFFFF00"),
  RADIUS,
  MARGIN,	
  PADDING,
] as const;

export const ImageStyle = [getStaticBorder("#00000000"), RADIUS, BORDER_WIDTH, MARGIN, PADDING] as const;


export const IconStyle = [
  getStaticBackground("#00000000"),
  FILL,
  getStaticBorder("#00000000"), 
  BORDER_WIDTH,
  {
    name: "activateColor",
    label: trans("iconComp.activateColor"),
    depTheme: "primary",
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  },
  RADIUS,
  MARGIN
  ] as const;


export const AntLayoutMenuStyle = [
  getStaticBackground("#FFFFFFFF"),
  {
    name: "menuBackground",
    label: trans("antLayoutComp.menuBackground"),
    color: "#FFFFFFFF",
  },
  {
    name: "subMenuBackground",
    label: trans("antLayoutComp.subMenuBackground"),
    color: "#fafafa",
  },
  {
    name: "selectedMenuBackground",
    label: trans("antLayoutComp.selectedMenuBackground"),
    color: "#e6f4ff",
  },
  {
    name: "menuFontColor",
    label: trans("antLayoutComp.menuFontColor"),
    color: "#000000",
  },
  {
    name: "selectedFontColor",
    label: trans("antLayoutComp.selectedFontColor"),
    color: "#1677ff",
  },
  {
    name: "triggerButtonBgColor",
    label: trans("antLayoutComp.triggerButtonBgColor"),
    color: "#f5f5f5",
  },
  {
    name: "triggerIconColor",
    label: trans("antLayoutComp.triggerIconColor"),
    color: "#393b47",
  }
] as const;

export const AntLayoutBodyStyle = [
  {
    name: "containerColor",
    label: trans("antLayoutComp.containerColor"),
    depTheme: 'canvas',
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  },
  getStaticBackground("#FFFFFFFF"),
  getStaticBorder("#FFFFFF00"),
  RADIUS,
  MARGIN,	
  PADDING,
] as const;

export const ListViewStyle = [
  getBackground(), 
  getStaticBorder(), 
  {
    name: "bottomBorderColor",
    label: trans("listView.borderBottom"),
    color: "#00000000",
  }, 
  RADIUS, 
  CONTAINER_BODY_PADDING];  // added by mousheng

export const JsonSchemaFormStyle = BG_STATIC_BORDER_RADIUS;

export const QRCodeStyle = [
  getBackground(),
  {
    name: "color",
    label: trans("color"),
    color: "#000000",
  },
  MARGIN,
  PADDING,
  BORDER,
  RADIUS,
  BORDER_WIDTH
] as const;

export const CardStyle = [
  getStaticBackground("#ffffff"),
  BORDER,
  {
    name: "IconColor",
    label: trans("card.IconColor"),
    color: "#000000",
  },
  {
    name: "activateColor",
    label: trans("card.hoverColor"),
    depTheme: "primary",
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  },
  CONTAINER_BODY_PADDING,
] as const;

export const GanttStyle = [
  {
    name: "overdueColor",
    label: trans("gantt.overdueColor"),
    color: "#dc2626",
  },
  {
    name: "overdueBgColor",
    label: trans("gantt.overdueBgColor"),
    color: "#ff5c5c",
  },
  {
    name: "projectCompletedColor",
    label: trans("gantt.projectCompletedColor"),
    color: "#46ad51",
  },
  {
    name: "projectColor",
    label: trans("gantt.projectColor"),
    color: "#46ad51",
  },
  {
    name: "projectColorBg",
    label: trans("gantt.projectColorBg"),
    color: "#65c16f",
  },
  {
    name: "taskColor",
    label: trans("gantt.taskColor"),
    color: "#299cb4",
  },
  {
    name: "taskColorBg",
    label: trans("gantt.taskColorBg"),
    color: "#3db9d3",
  },
  {
    name: "milestoneColor",
    label: trans("gantt.milestoneColor"),
    color: "#d33daf",
  },
  {
    name: "progressLowColor",
    label: trans("gantt.progressLowColor"),
    color: "#d96e6c",
  },
  {
    name: "progressLowBg",
    label: trans("gantt.progressLowBg"),
    color: "#3db9d3",
  },
  {
    name: "progressMediumColor",
    label: trans("gantt.progressMediumColor"),
    color: "#f57730",
  },
  {
    name: "progressMediumBg",
    label: trans("gantt.progressMediumBg"),
    color: "#3db9d3",
  },
  {
    name: "progressHighColor",
    label: trans("gantt.progressHighColor"),
    color: "#0c80b4",
  },
  {
    name: "progressHighBg",
    label: trans("gantt.progressHighBg"),
    color: "#3db9d3",
  },
  {
    name: "progresscompletedColor",
    label: trans("gantt.progresscompletedColor"),
    color: "#accaac",
  },
  {
    name: "link_f2s",
    label: trans("gantt.link_f2s"),
    color: "#ffac2f",
  },
  {
    name: "link_s2s",
    label: trans("gantt.link_s2s"),
    color: "#ffac2f",
  },
  {
    name: "link_f2f",
    label: trans("gantt.link_f2f"),
    color: "#ffac2f",
  },
  {
    name: "link_s2f",
    label: trans("gantt.link_s2f"),
    color: "#ffac2f",
  },
  {
    name: "weekend",
    label: trans("gantt.weekend"),
    color: "#EFF5FD",
  },
  {
    name: "weekendSelected",
    label: trans("gantt.weekendSelected"),
    color: "#EAE1A5",
  },
  {
    name: "noWorkHour",
    label: trans("gantt.noWorkHour"),
    color: "#EFF5FD",
  },
  {
    name: "noWorkHourSelected",
    label: trans("gantt.noWorkHourSelected"),
    color: "#EAE1A5",
  },
  {
    name: "padding",
    label: trans("gantt.tasksTableWidth"),
    padding: "",
  },
] as const;

export const TransferStyle = [
  MARGIN,	
] as const;

export const FloatButtonStyle = [
  {
    name: "badgeColor",
    label: trans("floatButton.badgeColor"),
    color: "#ff4d4f",
  },
] as const;

export const AvatarStyle = [
  {
    name: "background",
    label: trans("avatarComp.avatarBackground"),
    color: '#bfbfbf',
  },
  FILL,
  {
    name: "label",
    label: trans("avatarComp.label"),
    color: '#000000',
  },
  {
    name: "caption",
    label: trans("avatarComp.caption"),
    color: '#a5a5a5',
  },
] as const;

export const DescriptionsStyle = [
  getBackground(),
  MARGIN,	
  PADDING,
] as const;

export const amapStyle = [
  MARGIN,	
] as const;

export const TimeLineStyle = [
  getBackground(),
  getStaticBorder(),
  {
    name: "titleColor",
    label: trans("timeLine.titleColor"),
    color: "#000000",
  },
  {
    name: "labelColor",
    label: trans("timeLine.labelColor"),
    color: "#000000",
  },
  {
    name: "subTitleColor",
    label: trans("timeLine.subTitleColor"),
    color: "#848484",
  },
  MARGIN,
  PADDING,
  RADIUS
] as const;

export const TreeStyle = [
  LABEL,
  ...getStaticBgBorderRadiusByBg(SURFACE_COLOR),
  TEXT,
  VALIDATE,
] as const;

export const TreeSelectStyle = [...multiSelectCommon, ...ACCENT_VALIDATE] as const;

export const DrawerStyle = [getBackground()] as const

export const JsonEditorStyle = [LABEL] as const;

export const CalendarStyle = [
  getBackground("primarySurface"),
  {
    name: "border",
    label: trans("style.border"),
    depName: "background",
    transformer: calendarBackgroundToBorder,
  },
  RADIUS,
  {
    name: "text",
    label: trans("text"),
    depName: "background",
    depType: DEP_TYPE.CONTRAST_TEXT,
    transformer: handleCalendarText,
  },
  {
    name: "headerBtnBackground",
    label: trans("calendar.headerBtnBackground"),
    depName: "background",
    transformer: handleLightenColor,
  },
  {
    name: "btnText",
    label: trans("calendar.btnText"),
    depName: "headerBtnBackground",
    depType: DEP_TYPE.CONTRAST_TEXT,
    transformer: contrastText,
  },
  {
    name: "title",
    label: trans("calendar.title"),
    depName: "background",
    depType: DEP_TYPE.CONTRAST_TEXT,
    transformer: contrastText,
  },
  {
    name: "selectBackground",
    label: trans("calendar.selectBackground"),
    depTheme: "primary",
    transformer: handleCalendarSelectColor,
  },
] as const;

export const SignatureStyle = [
  LABEL,
  ...getBgBorderRadiusByBg(),
  {
    name: "pen",
    label: trans("style.pen"),
    color: "#000000",
  },
  {
    name: "tips",
    label: trans("style.tips"),
    color: "#B8B9BF",
  },
  {
    name: "footerIcon",
    label: trans("style.footerIcon"),
    color: "#222222",
  },
  MARGIN,
  PADDING,
  BORDER_WIDTH
] as const;

// Added by Aqib Mirza
export const LottieStyle = [
  {
    name: "background",
    label: trans("style.background"),
    depTheme: "canvas",
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  },
  MARGIN,
  PADDING,
] as const;

export const CommentStyle = [
  {
    name: "background",
    label: trans("style.background"),
    depTheme: "canvas",
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  },
  MARGIN,
  PADDING,
  RADIUS,
] as const

export const ResponsiveLayoutRowStyle = [
  ...BG_STATIC_BORDER_RADIUS,
  MARGIN,
  PADDING,
] as const;

export const ResponsiveLayoutColStyle = [
  ...BG_STATIC_BORDER_RADIUS,
  MARGIN,
  PADDING,
] as const;

export const NavLayoutStyle = [
  ...getBgBorderRadiusByBg(),
  {
    name: "text",
    label: trans("text"),
    depName: "background",
    // depTheme: "primary",
    depType: DEP_TYPE.CONTRAST_TEXT,
    transformer: contrastText,
  },
  MARGIN,
  PADDING,
  {
    name: "triggerColor",
    label: trans("navLayout.triggerColor"),
    color: '#000000',
  },
  {
    name: "triggerBGColor",
    label: trans("navLayout.triggerBGColor"),
    depTheme: 'canvas',
    depType: DEP_TYPE.SELF,
    transformer: toSelf,
  },
] as const;

export const NavLayoutItemStyle = [
  getBackground("primarySurface"),
  getStaticBorder('transparent'),
  RADIUS,
  {
    name: "text",
    label: trans("text"),
    depName: "background",
    depType: DEP_TYPE.CONTRAST_TEXT,
    transformer: contrastText,
  },
  MARGIN,
  PADDING,
] as const;

export const NavLayoutItemHoverStyle = [
  getBackground("canvas"),
  getStaticBorder('transparent'),
  {
    name: "text",
    label: trans("text"),
    depName: "background",
    depType: DEP_TYPE.CONTRAST_TEXT,
    transformer: contrastText,
  },
] as const;

export const NavLayoutItemActiveStyle = [
  getBackground("primary"),
  getStaticBorder('transparent'),
  {
    name: "text",
    label: trans("text"),
    depName: "background",
    depType: DEP_TYPE.CONTRAST_TEXT,
    transformer: contrastText,
  },
] as const;

export const avatarGroupStyle = [
  {
    name: "fill",
    label: trans("style.fill"),
    color: '#FFFFFF',
  },
  getBackground("primary"),
] as const;

export const timerStyle = [
  getBackground("primarySurface"),
  BORDER,
  RADIUS,
  {
    name: "fontColor",
    label: trans("timer.fontColor"),
    color: "#000000",
  },
] as const;

export const stepsStyle = [
  getBackground("primarySurface"),
  BORDER,
  RADIUS,
  PADDING,
] as const;

export const CarouselStyle = [getBackground("canvas")] as const;

export const RichTextEditorStyle = [
  getStaticBorder(),
  getBackground("primarySurface"),
  RADIUS,
  BORDER_WIDTH
] as const;

export type InputLikeStyleType = StyleConfigType<typeof InputLikeStyle>;
export type ColorPickerStyleType = StyleConfigType<typeof ColorPickerStyle>;
export type ButtonStyleType = StyleConfigType<typeof ButtonStyle>;
export type ToggleButtonStyleType = StyleConfigType<typeof ToggleButtonStyle>;
export type TextStyleType = StyleConfigType<typeof TextStyle>;
export type TimeLineType = StyleConfigType<typeof TimeLineStyle>;
export type ContainerStyleType = StyleConfigType<typeof ContainerStyle>;
export type ContainerHeaderStyleType = StyleConfigType<typeof ContainerHeaderStyle>;
export type ContainerBodyStyleType = StyleConfigType<typeof ContainerBodyStyle>;
export type ContainerFooterStyleType = StyleConfigType<typeof ContainerFooterStyle>;
export type SliderStyleType = StyleConfigType<typeof SliderStyle>;
export type RatingStyleType = StyleConfigType<typeof RatingStyle>;
export type SwitchStyleType = StyleConfigType<typeof SwitchStyle>;
export type SelectStyleType = StyleConfigType<typeof SelectStyle>;
export type MultiSelectStyleType = StyleConfigType<typeof MultiSelectStyle>;
export type TabContainerStyleType = StyleConfigType<typeof TabContainerStyle>;
export type ModalStyleType = StyleConfigType<typeof ModalStyle>;
export type CascaderStyleType = StyleConfigType<typeof CascaderStyle>;
export type CheckboxStyleType = StyleConfigType<typeof CheckboxStyle>;
export type RadioStyleType = StyleConfigType<typeof RadioStyle>;
export type SegmentStyleType = StyleConfigType<typeof SegmentStyle>;
export type TableStyleType = StyleConfigType<typeof TableStyle>;
export type TableHeaderStyleType = StyleConfigType<typeof TableHeaderStyle>;
export type TableToolbarStyleType = StyleConfigType<typeof TableToolbarStyle>;
export type TableRowStyleType = StyleConfigType<typeof TableRowStyle>;
export type TableColumnStyleType = StyleConfigType<typeof TableColumnStyle>;
export type TableColumnLinkStyleType = StyleConfigType<typeof TableColumnLinkStyle>;
export type FileStyleType = StyleConfigType<typeof FileStyle>;
export type FileViewerStyleType = StyleConfigType<typeof FileViewerStyle>;
export type IframeStyleType = StyleConfigType<typeof IframeStyle>;
export type DateTimeStyleType = StyleConfigType<typeof DateTimeStyle>;
export type LinkStyleType = StyleConfigType<typeof LinkStyle>;
export type DividerStyleType = StyleConfigType<typeof DividerStyle>;
export type ProgressStyleType = StyleConfigType<typeof ProgressStyle>;
export type CircleProgressType = StyleConfigType<typeof CircleProgressStyle>;
export type NavigationStyleType = StyleConfigType<typeof NavigationStyle>;
export type ImageStyleType = StyleConfigType<typeof ImageStyle>;
export type IconStyleType = StyleConfigType<typeof IconStyle>;
export type ListViewStyleType = StyleConfigType<typeof ListViewStyle>;
export type JsonSchemaFormStyleType = StyleConfigType<typeof JsonSchemaFormStyle>;
export type TreeSelectStyleType = StyleConfigType<typeof TreeSelectStyle>;
export type DrawerStyleType = StyleConfigType<typeof DrawerStyle>;
export type JsonEditorStyleType = StyleConfigType<typeof JsonEditorStyle>;
export type CalendarStyleType = StyleConfigType<typeof CalendarStyle>;
export type SignatureStyleType = StyleConfigType<typeof SignatureStyle>;
export type CarouselStyleType = StyleConfigType<typeof CarouselStyle>;
export type RichTextEditorStyleType = StyleConfigType<typeof RichTextEditorStyle>;
export type ResponsiveLayoutRowStyleType = StyleConfigType<typeof ResponsiveLayoutRowStyle>;
export type ResponsiveLayoutColStyleType = StyleConfigType<typeof ResponsiveLayoutColStyle>;
export type NavLayoutStyleType = StyleConfigType<typeof NavLayoutStyle>;
export type NavLayoutItemStyleType = StyleConfigType<typeof NavLayoutItemStyle>;
export type NavLayoutItemHoverStyleType = StyleConfigType<typeof NavLayoutItemHoverStyle>;
export type NavLayoutItemActiveStyleType = StyleConfigType<typeof NavLayoutItemActiveStyle>;
export type AntLayoutLogoStyleType = StyleConfigType<typeof AntLayoutLogoStyle>;
export type AntLayoutBodyStyleType = StyleConfigType<typeof AntLayoutBodyStyle>;
export type AntLayoutFramerStyleType = StyleConfigType<typeof AntLayoutFramerStyle>;
export type AntLayoutMenuStyleType = StyleConfigType<typeof AntLayoutMenuStyle>;
export type FloatButtonStyleType = StyleConfigType<typeof FloatButtonStyle>;
export type AvatarStyleType = StyleConfigType<typeof AvatarStyle>;
export type QRCodeStyleType = StyleConfigType<typeof QRCodeStyle>;
export type GanttStyleType = StyleConfigType<typeof GanttStyle>;
export type TransferStyleType = StyleConfigType<typeof TransferStyle>;
export type CardStyleType = StyleConfigType<typeof CardStyle>;
export type avatarGroupStyleType = StyleConfigType<typeof avatarGroupStyle>;
export type timerStyleType = StyleConfigType<typeof timerStyle>;
export type stepsStyleType = StyleConfigType<typeof stepsStyle>;

export function widthCalculator(margin: string) {
  const marginArr = margin?.trim().replace(/\s+/g, ' ').split(" ") || "";
  if (marginArr.length === 1) {
    return `calc(100% - ${parseInt(margin.replace(/[^\d.]/g, "")) * 2 +
      (margin.replace(/[0-9]/g, "") || "px")
      })`;
  } else if (marginArr.length === 2 || marginArr.length === 3) {
    return `calc(100% - ${parseInt(marginArr[1].replace(/[^\d.]/g, "")) * 2 +
      (marginArr[1].replace(/[0-9]/g, "") || 'px')
      })`;
  } else {
    return `calc(100% - ${parseInt(marginArr[1]?.replace(/[^\d.]/g, "") || "0") +
      (marginArr[1]?.replace(/[0-9]/g, "") || "px")
      } - ${parseInt(marginArr[3]?.replace(/[^\d.]/g, "") || "0") +
      (marginArr[3]?.replace(/[0-9]/g, "") || "px")
      })`;
  }
}

export function heightCalculator(margin: string) {
  const marginArr = margin?.trim().split(" ") || "";
  if (marginArr.length === 1 || marginArr.length === 2) {
    return `calc(100% - ${parseInt(marginArr[0].replace(/[^\d.]/g, "")) * 2 +
      (marginArr[0].replace(/[0-9]/g, "") || 'px')
      })`;
  } else if (marginArr.length > 2) {
    return `calc(100% - ${parseInt(marginArr[0]?.replace(/[^\d.]/g, "") || "0") +
      (marginArr[0]?.replace(/[0-9]/g, "") || "px")
      } - ${parseInt(marginArr[2]?.replace(/[^\d.]/g, "") || "0") +
      (marginArr[2]?.replace(/[0-9]/g, "") || "px")
      })`;
  }
}

export function marginCalculator(margin: string) {
  const marginArr = margin?.trim().split(" ") || "";
  if (marginArr.length === 1) {
    return parseInt(margin.replace(/[^\d.]/g, "")) * 2;
  } else if (marginArr.length === 2) {
    return parseInt(marginArr[0].replace(/[^\d.]/g, "")) * 2;
  } else {
    return parseInt(marginArr[0]?.replace(/[^\d.]/g, "") || "0") + parseInt(marginArr[2]?.replace(/[^\d.]/g, "") || "0")
  }
}

export type { ThemeDetail };
