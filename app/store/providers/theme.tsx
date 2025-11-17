'use client';
import React, { ReactNode } from 'react';
import { createUITheme } from '@devseed-ui/theme-provider';
import { DevseedUiThemeProvider } from '@lib';

// Values here should be manually synced until we consolidate all the styles to USWDS
// Be mindful that these values are used more for VEDA UI component, not for instance
// Use this page to look up the value: https://designsystem.digital.gov/design-tokens/color/system-tokens/
const VEDA_OVERRIDE_THEME = {
  zIndices: {
    hide: -1,
    docked: 10,
    sticky: 900,
    dropdown: 1550,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  color: {
    base: '#1B1B1B',
    primary: '#3E4DED',
    link: '#3E4DED',
    danger: '#FC3D21',
    infographicA: '#fcab10',
    infographicB: '#f4442e',
    infographicC: '#b62b6e',
    infographicD: '#8a54525b',
    infographicE: '#2276ac',
    infographicF: '#28730d'
  },
  type: {
    base: {
      leadSize: '1.25rem',
      extrabold: '800',
      line: 'inherit',
      family: '"Public Sans", sans-serif',
      // Increments to the type.base.size for each media breakpoint.
      sizeIncrement: {
        small: '0rem',
        medium: '0rem',
        large: '0.25rem',
        xlarge: '0.25rem',
      },
    },
    heading: {
      family: '"DM Sans", sans-serif',
      settings: '"wdth" 100, "wght" 700',
      weight: '500',
    },
  },
  layout: {
    min: '384px',
    max: '1440px',
    glspMultiplier: {
      xsmall: 1,
      small: 1,
      medium: 1.5,
      large: 2,
      xlarge: 2,
    },
  },
};

function DevseedUIThemeProvider({
  children,
}: {
  children: JSX.Element | ReactNode;
}) {
  return (
    <DevseedUiThemeProvider theme={createUITheme(VEDA_OVERRIDE_THEME)}>
      {children}
    </DevseedUiThemeProvider>
  );
}

export default DevseedUIThemeProvider;
