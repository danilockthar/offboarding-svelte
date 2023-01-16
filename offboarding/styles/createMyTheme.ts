import { createTheme, ThemeOptions } from '@material-ui/core/styles';
import { PaletteColorOptions, PaletteOptions, TypeText } from '@material-ui/core/styles/createPalette';

type customText = 'light'

type customPrimaryColors = 'gray'

interface CustomPalette extends PaletteOptions {
    text?: Partial<TypeText & Record<customText, string>>
    primary: PaletteColorOptions & Partial<Record<customPrimaryColors, string>>
}

interface CustomThemeOptions extends ThemeOptions {
    palette: CustomPalette
}

export default function createMyTheme(options: CustomThemeOptions) {
    return createTheme({
        ...options,
    })
}