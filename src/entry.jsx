import { useRouteData, useRoutes, A } from "@solidjs/router";
import { createResource } from "solid-js";

const ROUTES = [
  {
    path: "/",
    component: () => {
      const data = useRouteData();
      return (
        <>
          <h1>Hello from {data()}</h1>
          <A href="/child/22">soft navigation to /child/22</A>
        </>
      );
    },
    data: () => {
      console.info("data rendering function /");
      const [payload] = createResource(async () => {
        return "root!";
      });

      return payload;
    },
  },
  {
    path: "/child",
    data: () => {
      const [payload] = createResource(async () => {
        console.info("data function in `/child` route");
        return "parent";
      });

      return payload();
    },
    children: [
      {
        path: "/:id",
        component: () => {
          const data = useRouteData();

          return (
            <>
              <h2>child {data.current}</h2>
              <ul>
                <li>
                  <A href={`/child/${data.link}`}>soft navigate to sibling</A>{" "}
                  🪲 changes URL, doesn't updates content.
                </li>
                <li>
                  <a href={`/child/${data.link}`}>hard navigate to sibling</a>
                </li>
              </ul>
            </>
          );
        },
        data: ({ params, data }) => {
          /**
           * 🪲
           * according to docs, I believe `data` should be `"parent"` here.
           * But it's `undefined`.
           */
          console.info("data from parent route", data);

          const [payload] = createResource(() => ({
            current: params.id,
            link: params.id === "22" ? "23" : "22",
          }));

          return payload();
        },
      },
    ],
  },
];

export default function Entry() {
  const Routes = useRoutes(ROUTES);

  return <Routes />;
}
