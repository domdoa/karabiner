import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open } from "./utils";

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
    description: "Hyper + K -> Up Arrow",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "k",
          modifiers: {
            mandatory: ["left_control", "left_option", "left_command", "left_shift"]
          }
        },
        conditions: [
          {
            type: "variable_if",
            name: "hyper",
            value: 1
          }
        ],
        to: [
          {
            key_code: "up_arrow"
          }
        ]
      }
    ]
  },
  {
    description: "Hyper + J -> Down Arrow",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "j",
          modifiers: {
            mandatory: ["left_control", "left_option", "left_command", "left_shift"]
          }
        },
        conditions: [
          {
            type: "variable_if",
            name: "hyper",
            value: 1
          }
        ],
        to: [
          {
            key_code: "down_arrow"
          }
        ]
      }
    ]
  },
  {
    description: "Hyper + L -> Right Arrow",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "l",
          modifiers: {
            mandatory: ["left_control", "left_option", "left_command", "left_shift"]
          }
        },
        conditions: [
          {
            type: "variable_if",
            name: "hyper",
            value: 1
          }
        ],
        to: [
          {
            key_code: "right_arrow"
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
  
  // F → shift
  // D → command

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
            optional: ["any"]
          }
        },
        to: [
          {
            key_code: "left_shift"
          }
        ],
        to_if_alone: [
          {
            key_code: "f"
          }
        ],
        parameters: {
          "to_if_alone_timeout_milliseconds": 150
        }
      }
    ]
  },
  {
    description: "Home row mod: D -> Left Command",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "d",
          modifiers: {
            optional: ["any"]
          }
        },
        to: [
          {
            key_code: "left_command"
          }
        ],
        to_if_alone: [
          {
            key_code: "d"
          }
        ],
        parameters: {
          "to_if_alone_timeout_milliseconds": 150
        }
      }
    ]
  },
  {
    description: "Home row mod: I -> Left Shift",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "i",
          modifiers: {
            optional: ["any"]
          }
        },
        to: [
          {
            key_code: "left_shift"
          }
        ],
        to_if_alone: [
          {
            key_code: "i"
          }
        ],
        parameters: {
          "to_if_alone_timeout_milliseconds": 150
        }
      }
    ]
  },
  {
    description: "Home row mod: ; -> Left Command",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "semicolon",
          modifiers: {
            optional: ["any"]
          }
        },
        to: [
          {
            key_code: "left_command"
          }
        ],
        to_if_alone: [
          {
            key_code: "semicolon"
          }
        ],
        parameters: {
          "to_if_alone_timeout_milliseconds": 150
        }
      }
    ]
  },
  {
    description: "Home row mod: G -> Left option",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "g",
          modifiers: {
            optional: ["any"]
          }
        },
        to: [
          {
            key_code: "left_option"
          }
        ],
        to_if_alone: [
          {
            key_code: "g"
          }
        ],
        parameters: {
          "to_if_alone_timeout_milliseconds": 150
        }
      }
    ]
  },
  {
    description: "G+H -> Enter",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "h",
          modifiers: {
            mandatory: ["left_option"]
          }
        },
        to: [
          {
            key_code: "return_or_enter"
          }
        ]
      }
    ]
  },
  {
    description: "G+N -> Backspace",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "n",
          modifiers: {
            mandatory: ["left_option"]
          }
        },
        to: [
          {
            key_code: "delete_or_backspace"
          }
        ]
      }
    ]
  },
  

  ...createHyperSubLayers({
    spacebar: {
      c: app("Cursor"),
      b: app("Arc"),
      s: app("Slack"),
      n: app("Notes"),
      t: app("Ghostty"),
      f: app("Finder"),
      p: app("Spotify"),
      m: app("Mail"),
      g: app("ChatGPT"),
      d: app("TablePlus"),
    },

    // r = "Raycast"
    r: {
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      n: open("raycast://extensions/raycast/raycast-notes/raycast-notes"),
      s: open("raycast://extensions/raycast/calendar/my-schedule"),
      c: open("raycast://extensions/raycast/system/open-camera"),
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

    b: {
      f: open("https://facebook.com"),
      g: open("https://github.com"),
      v: open("https://vinted.lt"),
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
