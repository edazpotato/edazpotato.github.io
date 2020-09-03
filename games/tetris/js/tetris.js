var tetris = {

  // html elements
  page: null,
  page_home: null,
  page_game: null,
  game_col: null,
  game_zone: null,
  messages: null,
  overlay: null,
  infos: null,
  next_zone: null,
  best_zone: null,
  score_zone: null,
  lines_zone: null,

  // display (kinetic)
  stage: null,
  next_stage: null,
  layer_stone: null,
  layer_shadow: null,
  layer_block: null,
  next_layer: null,
  block_width: 0,
  block_width_standard: .07,
  display_stone: [],
  display_shadow: [],
  display_block: [],
  display_line: [],
  display_next: [],
  shine_tab: [],

  // game infos
  state: null,
  board: [],
  next_block: null,
  next_block_pos: null,
  block: null,
  block_pos: null,
  block_x: 0,
  block_y: 0,
  rows: 19,
  cols: 10,

  // speed
  fall_timeout: null,
  stationary: false,
  init_speed: 600,
  max_speed_mode: false,
  max_speed: 50,
  speed: 0,

  // counters
  level: 0,
  score: 0,
  best_score_tetris: 0,
  lines: 0,
  count_single: 0,
  count_double: 0,
  count_triple: 0,
  count_tetris: 0,

  // touch/finger controls
  last_pos_x: 0,
  last_pos_y: 0,
  moving: false,
  time_touch_down: 0,
  finger_lock: false,

  // keyboard controls
  press_left: false,
  press_right: false,
  press_down: false,
  press_drop: false,
  press_rotate: false,
  mappings: {
    '13': 'drop',   // 13 = Enter
    '32': 'drop',   // 32 = Space
    '37': 'left',   // 37 = Left
    '38': 'rotate', // 38 = Up
    '39': 'right',  // 39 = Right
    '40': 'down',   // 40 = Down
    '81': 'left',   // 81 = Q
    '90': 'rotate', // 90 = Z
    '68': 'right',  // 68 = D
    '83': 'down'    // 83 = S
  },
  colors: [
    '#00E4E4',  // line piece
    '#E4DE00',  // square piece
    '#004EE4',  // J piece
    '#E46200',  // L piece
    '#00E427',  // S piece
    '#E40027',  // Z piece
    '#9C13E4'   // T piece
  ],
  tab_probability: [1, 1, 1, 1, 1, 1, 1],
  shape: [
    // line piece
    [
      [
        [0,0,0,0],
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0]
      ],
      [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
      ],
      [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0]
      ]
    ],
    // square piece
    [
      [
        [1,1],
        [1,1]
      ]
    ],
    // J piece
    [
      [
        [0,0,0],
        [1,1,1],
        [0,0,1]
      ],
      [
        [0,1,0],
        [0,1,0],
        [1,1,0]
      ],
      [
        [1,0,0],
        [1,1,1],
        [0,0,0]
      ],
      [
        [0,1,1],
        [0,1,0],
        [0,1,0]
      ]
    ],
    // L piece
    [
      [
        [0,0,0],
        [1,1,1],
        [1,0,0]
      ],
      [
        [1,1,0],
        [0,1,0],
        [0,1,0]
      ],
      [
        [0,0,1],
        [1,1,1],
        [0,0,0]
      ],
      [
        [0,1,0],
        [0,1,0],
        [0,1,1]
      ]
    ],
    // S piece
    [
      [
        [0,0,0],
        [0,1,1],
        [1,1,0]
      ],
      [
        [1,0,0],
        [1,1,0],
        [0,1,0]
      ],
      [
        [0,1,1],
        [1,1,0],
        [0,0,0]
      ],
      [
        [0,1,0],
        [0,1,1],
        [0,0,1]
      ]
    ],
    // Z piece
    [
      [
        [0,0,0],
        [1,1,0],
        [0,1,1]
      ],
      [
        [0,1,0],
        [1,1,0],
        [1,0,0]
      ],
      [
        [1,1,0],
        [0,1,1],
        [0,0,0]
      ],
      [
        [0,0,1],
        [0,1,1],
        [0,1,0]
      ]
    ],
    // T piece
    [
      [
        [0,0,0],
        [1,1,1],
        [0,1,0]
      ],
      [
        [0,1,0],
        [1,1,0],
        [0,1,0]
      ],
      [
        [0,1,0],
        [1,1,1],
        [0,0,0]
      ],
      [
        [0,1,0],
        [0,1,1],
        [0,1,0]
      ]
    ]
  ],

  init: function () {
    tetris.page = document.getElementById('page');
    tetris.page_home = document.getElementById('page_home');
    tetris.page_game = document.getElementById('page_game');
    tetris.game_col = document.getElementById('game_col');
    tetris.game_zone = document.getElementById('game_zone');
    tetris.messages = document.getElementById('messages');
    tetris.overlay = document.getElementById('overlay');
    tetris.infos = document.getElementById('infos');
    tetris.next_zone = document.getElementById('next_zone');
    tetris.best_zone = document.getElementById('best_zone');
    tetris.score_zone = document.getElementById('score_zone');
    tetris.lines_zone = document.getElementById('lines_zone');

    tetris.block_width = tetris.page.offsetWidth * tetris.block_width_standard;

    tetris.stage = new Kinetic.Stage({
      container: 'game_zone',
      width: tetris.cols * tetris.block_width,
      height: (tetris.rows - 1) * tetris.block_width
    });
    tetris.layer_stone = new Kinetic.Layer();
    tetris.layer_shadow = new Kinetic.Layer();
    tetris.layer_block = new Kinetic.Layer();
    for (var i = 1; i < tetris.rows; i++) {
      tetris.display_stone[i] = [];
      tetris.display_shadow[i] = [];
      tetris.display_block[i] = [];
      for (var j = 0; j < tetris.cols; j++) {
        tetris.display_stone[i][j] = tetris.create_group(j * tetris.block_width, (i - 1) * tetris.block_width);
        tetris.layer_stone.add(tetris.display_stone[i][j]);
        tetris.display_shadow[i][j] = tetris.create_shadow(j * tetris.block_width, (i - 1) * tetris.block_width);
        tetris.layer_shadow.add(tetris.display_shadow[i][j]);
        tetris.display_block[i][j] = tetris.create_group(j * tetris.block_width, (i - 1) * tetris.block_width);
        tetris.layer_block.add(tetris.display_block[i][j]);
      };
      tetris.display_line[i] = new Kinetic.Rect({
        id: 'sq',
        x: 0,
        y: (i - 1) * tetris.block_width,
        width: tetris.block_width * tetris.cols,
        height: tetris.block_width,
        fill: '#ffffff'
      });
      tetris.display_line[i].hide();
      tetris.layer_block.add(tetris.display_line[i]);
    };
    tetris.stage.add(tetris.layer_stone);
    tetris.stage.add(tetris.layer_shadow);
    tetris.stage.add(tetris.layer_block);
    tetris.layer_stone.draw();
    tetris.layer_shadow.draw();
    tetris.layer_block.draw();
    tetris.next_stage = new Kinetic.Stage({
      container: 'next_zone',
      width: 4 * tetris.block_width,
      height: 4 * tetris.block_width
    });
    tetris.next_layer = new Kinetic.Layer();
    for (var i = 0; i < 4; i++) {
      tetris.display_next[i] = [];
      for (var j = 0; j < 4; j++) {
        tetris.display_next[i][j] = tetris.create_group(j * tetris.block_width, i * tetris.block_width);
        tetris.next_layer.add(tetris.display_next[i][j]);
      };
    };
    tetris.next_stage.add(tetris.next_layer);
    tetris.next_layer.draw();
    tetris.watch_keys();
    tetris.watch_touch();

    var local_best_score_tetris = localStorage.getItem('best_score_tetris');
    if (local_best_score_tetris != null) {
      tetris.best_score_tetris = local_best_score_tetris;
    }
    tetris.best_zone.innerHTML = tetris.best_score_tetris;



    tetris.resize();
    window.addEventListener('resize', function() {
      tetris.resize();
    });

    document.getElementById('bt_type_a').addEventListener('click', function() {
      tetris.set_mapping('a');
    });
    document.getElementById('bt_type_b').addEventListener('click', function() {
      tetris.set_mapping('b');
    });
    document.getElementById('bt_new_game').addEventListener('click', function(e) {
      e.preventDefault();
      tetris.show_game();
    });
    document.getElementById('bt_pause').addEventListener('click', function(e) {
      e.preventDefault();
      if (tetris.state == 'game') {
        tetris.pause_game();
      } else {
        if (tetris.state == 'pause') {
          tetris.resume_game();
        }
      }
    });

    // set default mapping
    tetris.set_mapping('a');

    tetris.show_home();
  },

  create_group: function (x, y) {
    var group = new Kinetic.Group({
      x: x,
      y: y
    });
    var square = new Kinetic.Rect({
      id: 'sq',
      x: 0,
      y: 0,
      width: tetris.block_width,
      height: tetris.block_width,
      fill: '#000000'
    });
    var light = new Kinetic.Polygon({
      x: 0,
      y: 0,
      points: [
        0, 0,
        tetris.block_width, 0,
        tetris.block_width * .8, tetris.block_width * .2,
        tetris.block_width * .2, tetris.block_width * .2,
        tetris.block_width * .2, tetris.block_width * .8,
        0, tetris.block_width
      ],
      fill: 'rgba(255, 255, 255, .3)'
    });
    var dark = new Kinetic.Polygon({
      x: 0,
      y: 0,
      points: [
        tetris.block_width, tetris.block_width,
        0, tetris.block_width,
        tetris.block_width * .2, tetris.block_width * .8,
        tetris.block_width * .8, tetris.block_width * .8,
        tetris.block_width * .8, tetris.block_width * .2,
        tetris.block_width, 0
      ],
      fill: 'rgba(0, 0, 0, .3)'
    });
    group.add(square);
    group.add(light);
    group.add(dark);

    return group;
  },

  create_shadow: function (x, y) {
    var square = new Kinetic.Rect({
      id: 'sq',
      x: x,
      y: y,
      opacity : .3,
      width: tetris.block_width,
      height: tetris.block_width,
      fill: '#000000'
    });
    return square;
  },

  show_home: function () {
    tetris.page_home.style.display = 'block';
    tetris.page_game.style.display = 'none';
    tetris.state = 'home';
  },

  show_game: function () {
    tetris.page_home.style.display = 'none';
    tetris.page_game.style.display = 'block';
    tetris.state = 'game';
    tetris.init_game();
  },

  set_mapping: function (type) {
    switch (type) {
      case 'a' :
        tetris.mappings['13'] = 'drop';   // 13 = Enter
        tetris.mappings['32'] = 'drop';   // 32 = Space
        tetris.mappings['38'] = 'rotate'; // 38 = Up
        tetris.mappings['90'] = 'rotate'; // 90 = Z
        document.getElementById('bt_type_a').className = 'on';
        document.getElementById('bt_type_a').nextElementSibling.className = 'on';
        document.getElementById('bt_type_b').className = '';
        document.getElementById('bt_type_b').nextElementSibling.className = '';
        break;
      case 'b' :
        tetris.mappings['13'] = 'rotate'; // 13 = Enter
        tetris.mappings['32'] = 'rotate'; // 32 = Space
        tetris.mappings['38'] = 'drop';   // 38 = Up
        tetris.mappings['90'] = 'drop';   // 90 = Z
        document.getElementById('bt_type_b').className = 'on';
        document.getElementById('bt_type_b').nextElementSibling.className = 'on';
        document.getElementById('bt_type_a').className = '';
        document.getElementById('bt_type_a').nextElementSibling.className = '';
        break;
    }
  },

  init_game: function () {
    tetris.state = 'game';
    tetris.overlay.style.display = 'none';
    tetris.level = 0;
    tetris.speed = tetris.init_speed;
    tetris.lines = 0;
    tetris.lines_zone.innerHTML = tetris.lines;
    tetris.score = 0;
    tetris.score_zone.innerHTML = tetris.score;
    tetris.count_single = 0;
    tetris.count_double = 0;
    tetris.count_triple = 0;
    tetris.count_tetris = 0;
    tetris.clear_board();
    tetris.create_block();

    setTimeout(function () {
      // hide the address bar
      window.scrollTo(0, 1);
    }, 0);
  },

  clear_board: function () {
    for (var i = 0; i < tetris.rows; i++) {
      tetris.board[i] = [];
      for (var j = 0; j < tetris.cols; j++) {
        tetris.board[i][j] = {
          stone: false,
          block: false,
          shadow: false,
          updated: true,
          color: null
        };
      };
    };
    tetris.show_stone();
  },

  get_random_block: function () {
    // find random number according to probability
    var rand = Math.random()*7;
    var stop = 0;
    rand -= tetris.tab_probability[stop];
    while (rand > 0) {
      stop++;
      if (stop > 6) {
        break;
      };
      rand -= tetris.tab_probability[stop];
    }
    // redistribute probability
    var to_distribute = tetris.tab_probability[stop] * .5;
    tetris.tab_probability[stop] *=  .5;
    for (var j = 0; j < 7; j++) {
      if (j != stop) {
        tetris.tab_probability[j] += to_distribute / 6;
      };
    }
    return stop;
  },

  create_next_block: function () {
    tetris.next_block = tetris.get_random_block();
    tetris.next_block_pos = Math.floor(Math.random()*tetris.shape[tetris.next_block].length);
    tetris.show_next();
  },

  create_block: function () {

    tetris.max_speed_mode = false;
    if (tetris.block == null || tetris.block_pos == null) {
      tetris.create_next_block();
    };
    tetris.block = tetris.next_block;
    tetris.block_pos = tetris.next_block_pos;

    tetris.create_next_block();

    tetris.block_x = 3;
    tetris.block_y = 0;

    while (!tetris.test_position(tetris.block, tetris.block_pos, tetris.block_x, tetris.block_y)) {
      tetris.block_y--;
    };


    tetris.update_block();

    tetris.fall_timeout = setTimeout(function(){
      tetris.fall_block();
    }, tetris.max_speed_mode ? tetris.max_speed : tetris.speed);

  },

  lock_block: function () {
    clearTimeout(tetris.fall_timeout);
    tetris.finger_lock = true;

    // turn moving block into stone
    for (var i = 0; i < tetris.rows; i++) {
      for (var j = 0; j < tetris.cols; j++) {
        if (tetris.board[i][j].block) {
          tetris.board[i][j].block = false;
          tetris.board[i][j].stone = true;
          tetris.board[i][j].updated = true;
          tetris.shine_tab.push({
            i: i,
            j: j
          });

        };
      }
    }

    tetris.shine();

    // check for line creation
    var lines_found = []
    for (var i = tetris.rows-1; i >= 0; i--) {
      var num_blocks = 0;
      for (var j = 0; j < tetris.cols; j++) {
        if (tetris.board[i][j].stone) {
          num_blocks++;
        };
      };
      if (num_blocks == tetris.cols) {
        lines_found.push(i);
        tetris.lit_line(i);
      };
    };

    tetris.show_stone();

    if (lines_found.length == 0) {
      // check for overflowing (game over)
      var game_over = false;
      for (var j = 0; j < tetris.cols; j++) {
        if (tetris.board[0][j].stone) {
          game_over = true;
          break;
        };
      };
      if (game_over) {
        tetris.game_over();
      } else {
        tetris.create_block();
      };
    } else {
      tetris.state = 'pause';
      // erase lines and fall blocks
      // add lines to counter
      tetris.lines += lines_found.length;
      tetris.lines_zone.innerHTML = tetris.lines;
      // adjust speed
      tetris.level = Math.floor(tetris.lines / 10);
      tetris.speed = tetris.init_speed - tetris.level * 50;
      if (tetris.speed < 100) {
        // maximum difficulty
        tetris.speed = 100;
      };
      // add points to counter
      switch (lines_found.length) {
        case 1 :
          tetris.count_single++;
          tetris.score += 40;
          break;
        case 2 :
          tetris.count_double++;
          tetris.score += 100;
          tetris.message('Double');
          break;
        case 3 :
          tetris.count_triple++;
          tetris.score += 300;
          tetris.message('Triple');
          break;
        case 4 :
          tetris.count_tetris++;
          tetris.score += 1200;
          tetris.message('Tetris');
          break;
      };
      tetris.score_zone.innerHTML = tetris.score;

      setTimeout(function(){
        // fall blocks
        var hole = 0;
        for (var i = tetris.rows-1; i >= 0; i--) {
          var hole_found = false;
          for (var k = 0; k < lines_found.length; k++) {
            if (lines_found[k] == i-hole) {
              hole_found = true;
            };
          }
          while (hole_found) {
            hole++;
            hole_found = false;
            for (var k = 0; k < lines_found.length; k++) {
              if (lines_found[k] == i-hole) {
                hole_found = true;
              };
            }
          };
          // copy line
          for (var j = 0; j < tetris.cols; j++) {
            if (i-hole >= 0) {
              tetris.board[i][j].stone = tetris.board[i-hole][j].stone;
              tetris.board[i][j].block = tetris.board[i-hole][j].block;
              tetris.board[i][j].shadow = tetris.board[i-hole][j].shadow;
              tetris.board[i][j].color = tetris.board[i-hole][j].color;
              tetris.board[i][j].updated = true;
            } else {
              tetris.board[i][j].stone = false;
              tetris.board[i][j].block = false;
              tetris.board[i][j].shadow = false;
              tetris.board[i][j].color = null;
              tetris.board[i][j].updated = true;
            };
          };
        };
        tetris.show_stone();
        tetris.state = 'game';
        tetris.create_block();
      }, 300);
    };
  },

  pause_game: function () {
    tetris.state = 'pause';
    clearTimeout(tetris.fall_timeout);
    var html = '<h2>Game paused</h2>';
    html += '<a class="button" id="bt_resume">Resume</a>';
    html += '<a class="button" id="bt_play_again">New game</a>';
    html += '<a class="button" id="bt_main_menu">Main menu</a>';
    html += '<a class="button" target="_blank" href="http://www.baptistebrunet.com/games/">Play more games</a>';
    tetris.overlay.innerHTML = html;
    tetris.overlay.style.display = 'block';

    document.getElementById('bt_resume').addEventListener('click', function() {
      tetris.resume_game();
    });
    document.getElementById('bt_play_again').addEventListener('click', function() {
      tetris.init_game();
    });
    document.getElementById('bt_main_menu').addEventListener('click', function() {
      tetris.show_home();
    });
  },

  resume_game: function () {
    tetris.state = 'game';
    tetris.fall_block();
    tetris.overlay.style.display = 'none';
  },

  game_over: function () {
    tetris.state = 'game_over';

    if (tetris.score > tetris.best_score_tetris) {
      tetris.best_score_tetris = tetris.score;
      localStorage.setItem('best_score_tetris', tetris.best_score_tetris);
      tetris.best_zone.innerHTML = tetris.best_score_tetris;
    }

    var html = '<h2>Game Over</h2>';
    html += '<div class="overview">';
    html += '<div class="points"><div class="nb_points">' + tetris.score + '</div> points</div>';
    html += '<div class="lines"><div class="nb_lines">' + tetris.lines + '</div> lines</div>';
    html += '</div>';
    html += '<a class="button" id="bt_play_again">Play again</a>';
    html += '<a class="button" id="bt_main_menu">Main menu</a>';
    html += '<a class="button" target="_blank" href="http://www.baptistebrunet.com/games/">Play more games</a>';
    tetris.overlay.innerHTML = html;
    tetris.overlay.style.display = 'block';

    document.getElementById('bt_play_again').addEventListener('click', function() {
      tetris.init_game();
    });
    document.getElementById('bt_main_menu').addEventListener('click', function() {
      tetris.show_home();
    });
  },

  fall_block: function () {
    if (tetris.test_position(tetris.block, tetris.block_pos, tetris.block_x, tetris.block_y + 1)) {
      // in the air : move the block down
      tetris.stationary = false;
      tetris.block_y++;
      tetris.update_block();
      if (tetris.max_speed_mode) {
        tetris.score += 1;
        tetris.score_zone.innerHTML = tetris.score;
      };
      tetris.fall_timeout = setTimeout(function(){
        tetris.fall_block();
      }, tetris.max_speed_mode ? tetris.max_speed : tetris.speed);
    } else {
      // on the ground
      if (tetris.stationary) {
        // lock the block
        tetris.lock_block();
      } else {
        // moving : lock delay
        tetris.stationary = true;
        tetris.fall_timeout = setTimeout(function(){
          tetris.fall_block();
        }, 300);
      }
    };
  },

  test_position: function (block, pos, x, y) {
    var allowed = true;
    for (var i = 0; i < tetris.shape[block][pos].length; i++) {
      if (allowed) {
        for (var j = 0; j < tetris.shape[block][pos][0].length; j++) {
          // for each block of the new pos ...
          if (tetris.shape[block][pos][i][j] == 1) {
            // ... check if there is room to move
            if (x + j < 0 || x + j >= tetris.cols || y + i >= tetris.rows) {
              // off the wall
              allowed = false;
              break;
            } else {
              if (y + i >= 0) {
                if (tetris.board[y + i][x + j].stone) {
                  // block already exists there
                  allowed = false;
                  break;
                };
              };
            };
          };
        };
      };
    };
    return allowed;
  },

  update_block: function () {
    // erase the previous block
    for (var i = 0; i < tetris.rows; i++) {
      for (var j = 0; j < tetris.cols; j++) {
        if (tetris.board[i][j].block || tetris.board[i][j].shadow) {
          tetris.board[i][j].block = false;
          tetris.board[i][j].shadow = false;
          tetris.board[i][j].updated = true;
        }
      };
    };
    // draw the new position of the block
    for (var i = 0; i < tetris.shape[tetris.block][tetris.block_pos].length; i++) {
      for (var j = 0; j < tetris.shape[tetris.block][tetris.block_pos][0].length; j++) {
        if (tetris.shape[tetris.block][tetris.block_pos][i][j] == 1) {
          if (tetris.block_y + i >= 0) {
            tetris.board[tetris.block_y + i][tetris.block_x + j].block = true;
            tetris.board[tetris.block_y + i][tetris.block_x + j].color = tetris.colors[tetris.block];
            tetris.board[tetris.block_y + i][tetris.block_x + j].updated = true;
          }
        }
      };
    };
    // cast shadow
    var kick_y = 0;
    while (tetris.test_position(tetris.block, tetris.block_pos, tetris.block_x, tetris.block_y + kick_y)) {
      kick_y++;
    }
    for (var i = 0; i < tetris.shape[tetris.block][tetris.block_pos].length; i++) {
      for (var j = 0; j < tetris.shape[tetris.block][tetris.block_pos][0].length; j++) {
        if (tetris.shape[tetris.block][tetris.block_pos][i][j] == 1) {
          if (tetris.block_y + i + (kick_y-1) >= 0) {
            if (tetris.board[tetris.block_y + i + (kick_y-1)][tetris.block_x + j].stone == false) {
              tetris.board[tetris.block_y + i + (kick_y-1)][tetris.block_x + j].shadow = true;
              tetris.board[tetris.block_y + i + (kick_y-1)][tetris.block_x + j].color = tetris.colors[tetris.block];
              tetris.board[tetris.block_y + i + (kick_y-1)][tetris.block_x + j].updated = true;
            };
          };
        };
      };
    };
    tetris.show_block();
  },

  show_stone: function () {
    for (var i = 1; i < tetris.rows; i++) {
      for (var j = 0; j < tetris.cols; j++) {
        if (tetris.board[i][j].color != null) {
          tetris.display_stone[i][j].children[0].setFill(tetris.board[i][j].color);
        };
        if (tetris.board[i][j].stone) {
          tetris.display_stone[i][j].show();
        } else {
          tetris.display_stone[i][j].hide();
        };
      };
    };
    // fix for Android 4.1
    /*
    var canvas = document.querySelectorAll('#game_zone canvas');
    canvas[0].width = tetris.block_width * tetris.cols;
    canvas[0].height = tetris.block_width * (tetris.rows - 1);
    canvas[1].width = tetris.block_width * tetris.cols;
    canvas[1].height = tetris.block_width * (tetris.rows - 1);
    canvas[2].width = tetris.block_width * tetris.cols;
    canvas[2].height = tetris.block_width * (tetris.rows - 1);
    */

    tetris.layer_stone.draw();
  },

  show_block: function () {
    for (var i = 1; i < tetris.rows; i++) {
      for (var j = 0; j < tetris.cols; j++) {
        if (tetris.board[i][j].updated) {
          if (tetris.board[i][j].block) {
            tetris.display_block[i][j].children[0].setFill(tetris.board[i][j].color);
            tetris.display_block[i][j].show();
          } else {
            tetris.display_block[i][j].hide();
          };
          if (tetris.board[i][j].shadow) {
            tetris.display_shadow[i][j].setFill(tetris.board[i][j].color);
            tetris.display_shadow[i][j].show();
          } else {
            tetris.display_shadow[i][j].hide();
          };
          tetris.board[i][j].updated = false;
        };
      };
    };
    // fix for Android 4.1
    /*
    var canvas = document.querySelectorAll('#game_zone canvas');
    canvas[0].width = tetris.block_width * tetris.cols;
    canvas[0].height = tetris.block_width * (tetris.rows - 1);
    canvas[1].width = tetris.block_width * tetris.cols;
    canvas[1].height = tetris.block_width * (tetris.rows - 1);
    canvas[2].width = tetris.block_width * tetris.cols;
    canvas[2].height = tetris.block_width * (tetris.rows - 1);
    */
    tetris.layer_shadow.draw();
    tetris.layer_block.draw();
  },

  show_next: function () {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        tetris.display_next[i][j].hide();
      };
    };
    for (var i = 0; i < tetris.shape[tetris.next_block][tetris.next_block_pos].length; i++) {
      for (var j = 0; j < tetris.shape[tetris.next_block][tetris.next_block_pos][0].length; j++) {
        if (tetris.shape[tetris.next_block][tetris.next_block_pos][i][j] == 1) {
          tetris.display_next[i][j].children[0].setFill(tetris.colors[tetris.next_block]);
          tetris.display_next[i][j].show();
        }
      };
    };
    switch (tetris.next_block) {
      case 0 :
        tetris.next_layer.setX(0);
        tetris.next_layer.setY(0);
        break;
      case 1 :
        tetris.next_layer.setX(tetris.block_width);
        tetris.next_layer.setY(tetris.block_width);
        break;
      default :
        tetris.next_layer.setX(tetris.block_width / 2);
        tetris.next_layer.setY(tetris.block_width / 2);
        break;
    }
    // fix for Android 4.1
    /*
    var canvas = document.querySelectorAll('#next_zone canvas');
    canvas[0].width = tetris.block_width * 4;
    canvas[0].height = tetris.block_width * 4;
    */

    tetris.next_layer.draw();
  },

  shake: function () {
    tetris.layer_stone.setY(tetris.block_width / 16);
    setTimeout(function(){
      tetris.layer_stone.setY(0);
    }, 50);
  },

  shine: function () {
    for (var k = 0; k < tetris.shine_tab.length; k++) {
      if (tetris.shine_tab[k].i > 0) {
        tetris.display_stone[tetris.shine_tab[k].i][tetris.shine_tab[k].j].children[1].setFill('rgba(255, 255, 255, .6)');
        tetris.display_stone[tetris.shine_tab[k].i][tetris.shine_tab[k].j].children[2].setFill('rgba(0, 0, 0, .6)');
      };
    };
    setTimeout(function(){
      for (var k = 0; k < tetris.shine_tab.length; k++) {
        if (tetris.shine_tab[k].i > 0) {
          tetris.display_stone[tetris.shine_tab[k].i][tetris.shine_tab[k].j].children[1].setFill('rgba(255, 255, 255, .3)');
          tetris.display_stone[tetris.shine_tab[k].i][tetris.shine_tab[k].j].children[2].setFill('rgba(0, 0, 0, .3)');
        };
      }
      tetris.shine_tab = [];
      tetris.layer_stone.draw();
    }, 100);
  },

  lit_line: function (line) {
    tetris.display_line[line].show();
    tetris.layer_block.draw();
    setTimeout(function(){
      tetris.display_line[line].hide();
      tetris.layer_block.draw();
    }, 100);
    setTimeout(function(){
      tetris.display_line[line].show();
      tetris.layer_block.draw();
    }, 200);
    setTimeout(function(){
      tetris.display_line[line].hide();
      tetris.layer_block.draw();
    }, 300);
  },

  message: function (texte) {
    tetris.messages.innerHTML = texte;
    setTimeout(function(){
      tetris.messages.innerHTML = '';
    }, 500);
  },

  move_left: function () {
    if (tetris.test_position(tetris.block, tetris.block_pos, tetris.block_x - 1, tetris.block_y)) {
      tetris.block_x--;
      tetris.stationary = false;
      tetris.update_block();
    };
  },

  move_right: function () {
    if (tetris.test_position(tetris.block, tetris.block_pos, tetris.block_x + 1, tetris.block_y)) {
      tetris.block_x++;
      tetris.stationary = false;
      tetris.update_block();
    };
  },

  drop_block: function () {
    var kick_y = 0;
    while (tetris.test_position(tetris.block, tetris.block_pos, tetris.block_x, tetris.block_y + kick_y)) {
      kick_y++;
    }
    tetris.block_y += kick_y - 1;
    tetris.score += kick_y - 1;
    tetris.score_zone.innerHTML = tetris.score;
    tetris.update_block();
    tetris.shake();
    tetris.lock_block();
  },

  rotate_block: function () {
    // try the new position
    var kick_x = 0;
    var kick_y = 0;
    var new_pos = tetris.block_pos + 1;
    if (new_pos >= tetris.shape[tetris.block].length) {
      new_pos = 0;
    };
    var allowed = true;
    allowed = tetris.test_position(tetris.block, new_pos, tetris.block_x, tetris.block_y);

    if (!allowed) {
      // try a wall kick on the left
      if (tetris.test_position(tetris.block, new_pos, tetris.block_x - 1, tetris.block_y)) {
        allowed = true;
        kick_x = -1;
      };
    }
    if (!allowed) {
      // try a wall kick on the right
      if (tetris.test_position(tetris.block, new_pos, tetris.block_x + 1, tetris.block_y)) {
        allowed = true;
        kick_x = 1;
      };
    }
    if (!allowed) {
      // try a wall kick on the top
      if (tetris.test_position(tetris.block, new_pos, tetris.block_x, tetris.block_y - 1)) {
        allowed = true;
        kick_y = -1;
      };
    }
    if (!allowed) {
      // try a double wall kick on the left
      if (tetris.test_position(tetris.block, new_pos, tetris.block_x - 2, tetris.block_y)) {
        allowed = true;
        kick_x = -2;
      };
    }
    if (!allowed) {
      // try a double wall kick on the right
      if (tetris.test_position(tetris.block, new_pos, tetris.block_x + 2, tetris.block_y)) {
        allowed = true;
        kick_x = 2;
      };
    }
    if (allowed) {
      // move the block (rotate)
      tetris.block_pos = new_pos;
      tetris.block_x += kick_x;
      tetris.block_y += kick_y;
      tetris.stationary = false;
      tetris.update_block();
    };
  },

  watch_keys: function () {
    document.addEventListener('keydown', function (e) {
      if (tetris.state == 'game' && tetris.mappings[e.keyCode]) {
        e.preventDefault();
        switch (tetris.mappings[e.keyCode]) {
          case 'left' :
            tetris.move_left();
            tetris.press_left = true;
            break;
          case 'right' :
            tetris.move_right();
            tetris.press_right = true;
            break;
          case 'drop' :
            if (!tetris.press_drop) {
              tetris.drop_block();
              tetris.press_drop = true;
            }
            break;
          case 'down' :
            if (!tetris.press_down) {
              tetris.max_speed_mode = true;
              clearTimeout(tetris.fall_timeout);
              tetris.stationary = true;
              tetris.fall_block();
              tetris.press_down = true;
            }
            break;
          case 'rotate' :
            if (!tetris.press_rotate) {
              tetris.rotate_block();
              tetris.press_rotate = true;
            }
            break;
        };
      };
    });
    document.addEventListener('keyup', function (e) {
      if ((tetris.state == 'game' || tetris.state == 'pause') && tetris.mappings[e.keyCode]) {
        e.preventDefault();
        switch (tetris.mappings[e.keyCode]) {
          case 'left' :
            tetris.press_left = false;
            break;
          case 'right' :
            tetris.press_right = false;
            break;
          case 'drop' :
            tetris.press_drop = false;
            break;
          case 'down' :
            tetris.max_speed_mode = false;
            tetris.press_down = false;
            break;
          case 'rotate' :
            tetris.press_rotate = false;
            break;
        }
      }
    });
  },

  watch_touch: function () {
    document.addEventListener('touchstart', function (e) {
      if (tetris.state == 'game') {
        tetris.last_pos_x = e.targetTouches[0].pageX;
        tetris.last_pos_y = e.targetTouches[0].pageY;
        tetris.moving = false;
        tetris.finger_lock = false;
      };
    });
    document.addEventListener('touchmove', function (e) {
      // prevent window scrolling
      e.preventDefault();
      if (tetris.state == 'game' && tetris.finger_lock == false) {
        var new_pos_x = e.targetTouches[0].pageX;
        var new_pos_y = e.targetTouches[0].pageY;
        if (new_pos_x - tetris.last_pos_x <= -tetris.block_width) {
          // finger going left
          tetris.last_pos_x = new_pos_x;
          tetris.last_pos_y = new_pos_y;
          tetris.moving = true;
          tetris.max_speed_mode = false;
          tetris.move_left();
        };
        if (new_pos_x - tetris.last_pos_x >= tetris.block_width) {
          // finger going right
          tetris.last_pos_x = new_pos_x;
          tetris.last_pos_y = new_pos_y;
          tetris.moving = true;
          tetris.max_speed_mode = false;
          tetris.move_right();
        };
        if (new_pos_y - tetris.last_pos_y >= tetris.block_width) {
          // finger going down
          tetris.last_pos_x = new_pos_x;
          tetris.last_pos_y = new_pos_y;
          tetris.moving = true;
          tetris.max_speed_mode = true;
          tetris.time_touch_down = (new Date).getTime();
          clearTimeout(tetris.fall_timeout);
          tetris.stationary = true;
          tetris.fall_block();
        };
        if (new_pos_y - tetris.last_pos_y <= -tetris.block_width) {
          // finger going up
          tetris.last_pos_x = new_pos_x;
          tetris.last_pos_y = new_pos_y;
          tetris.moving = true;
          tetris.max_speed_mode = false;
        };

      };
    });
    document.addEventListener('touchend', function (e) {
      if (tetris.state == 'game') {
        if (!tetris.moving) {
          tetris.rotate_block();
        } else {
          if (tetris.max_speed_mode) {
            tetris.max_speed_mode = false;
            if ((new Date).getTime() - tetris.time_touch_down < 100) {
              tetris.drop_block();
            };
          };
        };
      };
    });
  },

  resize: function() {
    tetris.block_width = tetris.page.offsetWidth * tetris.block_width_standard;
    tetris.game_col.style.width = tetris.block_width * tetris.cols + 'px';
    tetris.game_col.style.height = tetris.block_width * (tetris.rows - 1) + 'px';
    tetris.next_zone.style.width = tetris.block_width * 4 + 'px';
    tetris.next_zone.style.height = tetris.block_width * 4 + 'px';
  }

};

tetris.init();
