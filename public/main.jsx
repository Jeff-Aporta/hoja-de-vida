addLink('/main.css');

Object.assign(window, window['MaterialUI']);

const darkTheme = createTheme({
        palette: {
                mode: 'dark',
        },
});

const lightTheme = createTheme({
        palette: {
                mode: 'light',
        },
});