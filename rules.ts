import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, open } from "./utils";

const rules: KarabinerRules[] = [
  {
    description: "Spacebar -> Hyper Key (⌃⌥⇧⌘) [hold]",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "spacebar",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "left_control",
            modifiers: ["left_option", "left_command", "left_shift"],
          },
        ],
        to_if_alone: [
          {
            key_code: "spacebar",
          },
        ],
      },
    ],
  },
  {
    description: "Both Shifts -> Caps Lock",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "left_shift",
          modifiers: {
            mandatory: ["right_shift"],
            optional: ["caps_lock"],
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
            optional: ["caps_lock"],
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
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
          {
            key_code: "left_control",
            modifiers: ["left_option", "left_command", "left_shift"],
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
      },
    ],
  },
  {
    description: "Hyper + F -> Maximize Window",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "f",
          modifiers: {
            mandatory: [
              "left_control",
              "left_option",
              "left_command",
              "left_shift",
            ],
          },
        },
        conditions: [
          {
            type: "variable_if",
            name: "hyper",
            value: 1,
          },
        ],
        to: [
          {
            shell_command:
              "open -g raycast://extensions/raycast/window-management/maximize",
          },
        ],
      },
    ],
  },
  {
    description: "Hyper + K -> Up Arrow",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "k",
          modifiers: {
            mandatory: [
              "left_control",
              "left_option",
              "left_command",
              "left_shift",
            ],
          },
        },
        conditions: [
          {
            type: "variable_if",
            name: "hyper",
            value: 1,
          },
        ],
        to: [
          {
            key_code: "up_arrow",
          },
        ],
      },
    ],
  },
  {
    description: "Hyper + J -> Down Arrow",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "j",
          modifiers: {
            mandatory: [
              "left_control",
              "left_option",
              "left_command",
              "left_shift",
            ],
          },
        },
        conditions: [
          {
            type: "variable_if",
            name: "hyper",
            value: 1,
          },
        ],
        to: [
          {
            key_code: "down_arrow",
          },
        ],
      },
    ],
  },
  {
    description: "Hyper + L -> Right Arrow",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "l",
          modifiers: {
            mandatory: [
              "left_control",
              "left_option",
              "left_command",
              "left_shift",
            ],
          },
        },
        conditions: [
          {
            type: "variable_if",
            name: "hyper",
            value: 1,
          },
        ],
        to: [
          {
            key_code: "right_arrow",
          },
        ],
      },
    ],
  },
  // F → shift
  // D → command
  // G → option

  // I → shift
  // ; → command

  // GH → enter
  // GN → backspace
  {
    description: "Home row mod: F -> Left Shift",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "f",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "left_shift",
          },
        ],
        to_if_alone: [
          {
            key_code: "f",
          },
        ],
        parameters: {
          to_if_alone_timeout_milliseconds: 400,
        },
      },
    ],
  },
  {
    description: "Home row mod: D -> Left Command",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "d",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "left_command",
          },
        ],
        to_if_alone: [
          {
            key_code: "d",
          },
        ],
        parameters: {
          to_if_alone_timeout_milliseconds: 800,
        },
      },
    ],
  },
  {
    description: "Home row mod: I -> Left Shift",
    manipulators: [
      {
        type: "basic",
        conditions: [
          {
            type: "variable_if",
            name: "hyper",
            value: 0,
          },
        ],
        from: {
          key_code: "i",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "left_shift",
          },
        ],
        to_if_alone: [
          {
            key_code: "i",
          },
        ],
        parameters: {
          to_if_alone_timeout_milliseconds: 400,
        },
      },
    ],
  },
  {
    description: "Home row mod: ; -> Left Command",
    manipulators: [
      {
        type: "basic",
        conditions: [
          {
            type: "variable_if",
            name: "hyper",
            value: 0,
          },
        ],
        from: {
          key_code: "semicolon",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "left_command",
          },
        ],
        to_if_alone: [
          {
            key_code: "semicolon",
          },
        ],
        parameters: {
          to_if_alone_timeout_milliseconds: 400,
        },
      },
    ],
  },
  {
    description: "Home row mod: G -> Left option",
    manipulators: [
      {
        type: "basic",
        conditions: [
          {
            type: "variable_if",
            name: "hyper",
            value: 0,
          },
        ],
        from: {
          key_code: "g",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "left_option",
          },
        ],
        to_if_alone: [
          {
            key_code: "g",
          },
        ],
        parameters: {
          to_if_alone_timeout_milliseconds: 400,
        },
      },
    ],
  },
  {
    description: "G+H -> Enter",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "h",
          modifiers: {
            mandatory: ["left_option"],
          },
        },
        to: [
          {
            key_code: "return_or_enter",
          },
        ],
      },
    ],
  },
  {
    description: "G+U -> Backspace",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "u",
          modifiers: {
            mandatory: ["left_option"],
          },
        },
        to: [
          {
            key_code: "delete_or_backspace",
          },
        ],
      },
    ],
  },

  // Additional shorctus, not covered by Raycast (Hyper is Caps lock hold for karabiner)
  // Hyper + M -> Mail
  // Hyper + S -> Schedule (raycast extension)

  {
    description: "Hyper (⌃⌥⇧⌘) + M -> Mail",
    manipulators: [
      {
        type: "basic",
        conditions: [
          {
            type: "variable_if",
            name: "hyper",
            value: 1,
          },
        ],
        from: {
          key_code: "m",
          modifiers: {
            mandatory: [
              "left_control",
              "left_shift",
              "left_option",
              "left_command",
            ],
          },
        },
        to: [
          {
            shell_command: "open -a 'Mail.app'",
          },
        ],
      },
    ],
  },
  {
    description: "Hyper (⌃⌥⇧⌘) + S -> Schedule",
    manipulators: [
      {
        type: "basic",
        conditions: [
          {
            type: "variable_if",
            name: "hyper",
            value: 1,
          },
        ],
        from: {
          key_code: "s",
          modifiers: {
            mandatory: [
              "left_control",
              "left_shift",
              "left_option",
              "left_command",
            ],
          },
        },
        to: [
          {
            shell_command:
              "open raycast://extensions/raycast/calendar/my-schedule",
          },
        ],
      },
    ],
  },

  {
    description: "F4 -> Raycast Search Google",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "f4",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            shell_command:
              "open raycast://extensions/mblode/google-search/index",
          },
        ],
      },
    ],
  },

  ...createHyperSubLayers({
    // spacebar: {
    // m: app("Mail"),
    //   c: app("Cursor"),
    //   b: app("Arc"),
    //   s: app("Slack"),
    //   n: app("Notes"),
    //   t: app("Ghostty"),
    //   f: app("Finder"),
    //   p: app("Spotify"),
    //   g: app("ChatGPT"),
    //   d: app("TablePlus"),
    // },

    // r = "Raycast"
    r: {
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols",
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      n: open("raycast://extensions/raycast/raycast-notes/raycast-notes"),
      s: open("raycast://extensions/raycast/calendar/my-schedule"),
      c: open("raycast://extensions/raycast/system/open-camera"),
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      u: {
        to: [{ key_code: "page_down" }],
      },
      i: {
        to: [{ key_code: "page_up" }],
      },
    },

    a: {
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
    },

    // s = "System"
    // s: {
    //   // u: {
    //   //   to: [{ key_code: "volume_increment" }],
    //   // },
    //   // j: {
    //   //   to: [{ key_code: "volume_decrement" }],
    //   // },
    // },

    // b = "Browser"
    // b: {
    //   g: open("https://github.com"),
    //   f: open("https://facebook.com"),
    //   v: open("https://vinted.lt"),
    // },
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
    2,
  ),
);
