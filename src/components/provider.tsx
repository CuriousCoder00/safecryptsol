import { ThemeProvider } from "next-themes";


export default function Provider(children :React.ReactNode){
    return (
        <ThemeProvider attribute="class">
            {children}
        </ThemeProvider>
    )
}