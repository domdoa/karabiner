import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle } from "./utils";

const rules: KarabinerRules[] = [
  {
    description: "Both Shifts -> Caps Lock",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "left_shift",
          modifiers: {
            mandatory: ["right_shift"],
            optional: ["caps_lock"]
          },
        },
        to: [
          {
            key_code: "caps_lock",
          },
        ],
      },
      {
        type: "basic",
        from: {
          key_code: "right_shift",
          modifiers: {
            mandatory: ["left_shift"],
            optional: ["caps_lock"]
          },
        },
        to: [
          {
            key_code: "caps_lock",
          },
        ],
      },
    ],
  },
  {
    description: "Caps Lock -> Escape [tap], Hyper Key (⌃⌥⇧⌘) [hold]",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"]
          }
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1
            }
          },
          {
            key_code: "left_control",
            modifiers: ["left_option", "left_command", "left_shift"]
          }
        ],
        to_if_alone: [
          {
            key_code: "escape"
          }
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0
            }
          }
        ]
      }
    ]
  },
  {
    description: "F4 -> Raycast Search Google",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "f4",
          modifiers: {
            optional: ["any"]
          }
        },
        to: [
          {
            shell_command: "open raycast://extensions/mblode/google-search/index"
          }
        ]
      }
    ]
  },
  
  ...createHyperSubLayers({
    // b = "B"rowse
    b: {
      f: open("https://facebook.com"),
    },
    spacebar: {
      c: app("Cursor"),
      b: app("Arc"),
      s: app("Slack"),
      n: app("Notes"),
      t: app("Ghostty"),
      f: app("Finder"),
      p: app("Spotify"),
    },

    // w = "Window" via rectangle.app
    w: {
      u: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      i: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
      n: {
        description: "Window: Next Window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["right_command"],
          },
        ],
      },
      b: {
        description: "Window: Back",
        to: [
          {
            key_code: "open_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      f: {
        description: "Window: Forward",
        to: [
          {
            key_code: "close_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
    },

    // s = "System"
    s: {
      u: {
        to: [{ key_code: "volume_increment" }],
      },
      j: {
        to: [{ key_code: "volume_decrement" }],
      },
      c: open("raycast://extensions/raycast/system/open-camera"),
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      u: {
        to: [{ key_code: "page_down" }],
      },
      i: {
        to: [{ key_code: "page_up" }],
      },
    },

    // r = "Raycast"
    r: {
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      s: open("raycast://extensions/raycast/calendar/my-schedule")
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
