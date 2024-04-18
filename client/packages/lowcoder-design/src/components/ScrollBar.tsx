import React from "react";
import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import styled from "styled-components";
import { DebouncedFunc } from 'lodash'; // Assuming you're using lodash's DebouncedFunc type


const ScrollBarWrapper = styled.div<{ hidePlaceholder?: boolean }>`
  min-height: 0;
  height: 100%;
  width: 100%;

  .simplebar-scrollbar::before {
    background: rgba(139, 143, 163, 0.5) !important;
    right: 4px !important;
    left: 1px !important;
  }

  .simplebar-hover::before {
    background: rgba(139, 143, 163, 0.5) !important;
    right: 4px !important;
    left: 1px !important;
    opacity: 1 !important;
  }

  .simplebar-content-wrapper {
    height: 100% !important;
    outline: none !important;
  }

  .simplebar-offset {
    width: 100% !important;
  }

  .simplebar-track.simplebar-vertical .simplebar-scrollbar:before {
    top: 10px;
    bottom: 10px;
  }

  ${props => props.hidePlaceholder && `
    .simplebar-placeholder {
      display: none !important;
    }
  `}
`;

// .simplebar-placeholder { added by Falk Wolsky to hide the placeholder - as it doubles the vertical space of a Module on a page

interface IProps {
  children: React.ReactNode;
  className?: string;
  height?: string;
  style?: React.CSSProperties; // Add this line to include a style prop
  scrollableNodeProps?: {
    onScroll: DebouncedFunc<(e: any) => void>;
  };
  hidePlaceholder?: boolean;
  hideScrollbar?: boolean;
}

export const ScrollBar = ({ height = "100%", className, children, style, scrollableNodeProps, hideScrollbar = false, ...otherProps }: IProps) => {
  // You can now use the style prop directly or pass it to SimpleBar
  const combinedStyle = { ...style, height }; // Example of combining height with passed style

  return hideScrollbar ? (
    <ScrollBarWrapper className={className}>
      {children}
    </ScrollBarWrapper>
  ) : (
    <ScrollBarWrapper className={className}>
      <SimpleBar style={combinedStyle} scrollableNodeProps={scrollableNodeProps} {...otherProps}>
        {children}
      </SimpleBar>
    </ScrollBarWrapper>
  );
};
