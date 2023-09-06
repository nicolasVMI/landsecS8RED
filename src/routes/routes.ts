import ErrorMessage from "@pages/ErrorMessage"
import TabletController from "@pages/TabletController"
import Loading from "@components/Loading/Loading"

const routes = [
  {
    name: "Control",
    path: "/",
    element: TabletController,
  },
  { path: "/*", name: "Not Found", element: ErrorMessage },
]

export default routes
