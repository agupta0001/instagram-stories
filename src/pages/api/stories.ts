// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const mockData = [
  {
    id: "SDqolnwhpM6HsQhuD5eNr",
    name: "Orlando Langworth",
    username: "Lonzo.Nikolaus30",
    avatar: "https://avatars.githubusercontent.com/u/27469926",
    stories: [
      {
        id: "MZFgz1xL6w5p8IY5fb9fB",
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        created: "2024-08-29T01:12:32.399Z",
        userId: "SDqolnwhpM6HsQhuD5eNr",
        type: "VID",
      },
      {
        id: "lxKJpRNg5XGYMkRdPY3Zt",
        url: "https://picsum.photos/seed/rzuY1PT/640/480",
        created: "2024-08-29T01:25:29.241Z",
        userId: "SDqolnwhpM6HsQhuD5eNr",
      },
    ],
  },
  {
    id: "dpBDTmmpkLccLQORUCQ13",
    name: "Dustin Adams",
    username: "Trent42",
    avatar: "https://avatars.githubusercontent.com/u/69004360",
    stories: [
      {
        id: "cSSDljPRGWQQVH6UcqkZy",
        url: "https://loremflickr.com/640/480?lock=5817403933982720",
        created: "2024-08-29T10:35:39.966Z",
        userId: "dpBDTmmpkLccLQORUCQ13",
      },
      {
        id: "hOx64b_yj8azUUqshNN6a",
        url: "https://loremflickr.com/640/480?lock=5812637132652544",
        created: "2024-08-28T23:54:20.312Z",
        userId: "dpBDTmmpkLccLQORUCQ13",
      },
    ],
  },
  {
    id: "HBTqQ8Z9fck5PsuDXnk77",
    name: "Roger Kirlin",
    username: "Alan.Hammes",
    avatar: "https://avatars.githubusercontent.com/u/15513830",
    stories: [
      {
        id: "GRyzqTCw2BeB_Xpya36KA",
        url: "https://loremflickr.com/640/480?lock=1547400179089408",
        created: "2024-08-28T20:34:06.539Z",
        userId: "HBTqQ8Z9fck5PsuDXnk77",
      },
      {
        id: "W8jFn55SHKbKM1ZLLESoD",
        url: "https://picsum.photos/seed/Y8mY2jE02o/640/480",
        created: "2024-08-28T23:10:31.410Z",
        userId: "HBTqQ8Z9fck5PsuDXnk77",
      },
    ],
  },
  {
    id: "5E6CBQwCDyGcYYvvi7LiE",
    name: "Cristina Gottlieb",
    username: "Rene60",
    avatar: "https://avatars.githubusercontent.com/u/93963340",
    stories: [
      {
        id: "E6gPX36F9U2Onzi2IrO8A",
        url: "https://loremflickr.com/640/480?lock=5430643737493504",
        created: "2024-08-28T23:29:46.991Z",
        userId: "5E6CBQwCDyGcYYvvi7LiE",
      },
      {
        id: "XHlBXJELtlaQtE1qP6ozE",
        url: "https://loremflickr.com/640/480?lock=5024050225086464",
        created: "2024-08-29T02:49:08.165Z",
        userId: "5E6CBQwCDyGcYYvvi7LiE",
      },
    ],
  },
  {
    id: "3Vsd9eqFrH3uEv4uFSB0N",
    name: "Mabel Braun",
    username: "Trycia11",
    avatar: "https://avatars.githubusercontent.com/u/19210523",
    stories: [
      {
        id: "kNjIU2auhl5Xc_ewuY5Dc",
        url: "https://picsum.photos/seed/29rDXXBdmW/640/480",
        created: "2024-08-29T00:03:13.404Z",
        userId: "3Vsd9eqFrH3uEv4uFSB0N",
      },
      {
        id: "RBs6cbRpseYeXX9cvGtCJ",
        url: "https://loremflickr.com/640/480?lock=9000461197639680",
        created: "2024-08-29T07:45:44.716Z",
        userId: "3Vsd9eqFrH3uEv4uFSB0N",
      },
    ],
  },
  {
    id: "Rt69cgqFZJcYef_pE96XY",
    name: "Rita O'Reilly",
    username: "Isac.Klocko",
    avatar: "https://avatars.githubusercontent.com/u/16800760",
    stories: [
      {
        id: "fCDMSL3_ypkWWxKvKH-X2",
        url: "https://loremflickr.com/640/480?lock=375618875162624",
        created: "2024-08-29T07:50:21.339Z",
        userId: "Rt69cgqFZJcYef_pE96XY",
      },
      {
        id: "WnW4J8-Qoa6J_ZpH22kqq",
        url: "https://picsum.photos/seed/9W1dtiP0T/640/480",
        created: "2024-08-29T00:22:27.502Z",
        userId: "Rt69cgqFZJcYef_pE96XY",
      },
    ],
  },
  {
    id: "1Itk4nKPDWM3vaRN49DrE",
    name: "Emmett Fisher",
    username: "Leta.Gleichner16",
    avatar: "https://avatars.githubusercontent.com/u/90824885",
    stories: [
      {
        id: "hosCJj4f1ZPanl-S3lLqw",
        url: "https://picsum.photos/seed/TkghQ/640/480",
        created: "2024-08-29T09:21:57.391Z",
        userId: "1Itk4nKPDWM3vaRN49DrE",
      },
      {
        id: "P9KXxJNuoC3eaqSsYOYGX",
        url: "https://loremflickr.com/640/480?lock=7105271197335552",
        created: "2024-08-29T08:18:21.832Z",
        userId: "1Itk4nKPDWM3vaRN49DrE",
      },
    ],
  },
  {
    id: "PNqBypce4liSMEv5ZtSyG",
    name: "Terrence Ankunding",
    username: "Robb.Stiedemann69",
    avatar: "https://avatars.githubusercontent.com/u/78904325",
    stories: [
      {
        id: "uVuAKt09lbGEwU_TzV8kr",
        url: "https://loremflickr.com/640/480?lock=7524993197932544",
        created: "2024-08-29T09:48:23.196Z",
        userId: "PNqBypce4liSMEv5ZtSyG",
      },
      {
        id: "tdq-UeT39DkwT1Rujuse6",
        url: "https://picsum.photos/seed/WY0erJI/640/480",
        created: "2024-08-29T06:42:55.886Z",
        userId: "PNqBypce4liSMEv5ZtSyG",
      },
    ],
  },
  {
    id: "4lVjyX54C0dt8-WM0qA2X",
    name: "Lorene Kling",
    username: "Barry_Purdy84",
    avatar: "https://avatars.githubusercontent.com/u/942655",
    stories: [
      {
        id: "YfkYeHhbMJkcRkg7dksDC",
        url: "https://picsum.photos/seed/RmTft2t/640/480",
        created: "2024-08-29T04:34:46.887Z",
        userId: "4lVjyX54C0dt8-WM0qA2X",
      },
      {
        id: "nTVUxgs9OEGdg70UxXZWu",
        url: "https://picsum.photos/seed/tku2gpDj/640/480",
        created: "2024-08-29T00:23:24.190Z",
        userId: "4lVjyX54C0dt8-WM0qA2X",
      },
    ],
  },
  {
    id: "shlJ0ph_EshvEqBEakJHf",
    name: "Christine Douglas",
    username: "Rowena_Kuphal53",
    avatar: "https://avatars.githubusercontent.com/u/71827575",
    stories: [
      {
        id: "42qzfg5-hjAyWDVWgrMJP",
        url: "https://picsum.photos/seed/eTM6H9AL/640/480",
        created: "2024-08-29T06:09:40.503Z",
        userId: "shlJ0ph_EshvEqBEakJHf",
      },
      {
        id: "UMLjCpZkb-Sni93hqJ_Me",
        url: "https://picsum.photos/seed/9uSXYEuY/640/480",
        created: "2024-08-29T00:56:40.488Z",
        userId: "shlJ0ph_EshvEqBEakJHf",
      },
    ],
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(mockData);
}
