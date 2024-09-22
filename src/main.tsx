import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { store } from "@src/app/store.ts"
import { Provider } from "react-redux"
import { ResetStyle } from "./styles/ResetStyle.ts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ThemeProvider } from "styled-components"
import {theme} from "@styles/theme.ts"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ResetStyle />
        <App />
        <ReactQueryDevtools />
      </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
