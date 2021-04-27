#!/bin/sh
# After change the Head in manifest.json
sed 's/telegram/wechat/g;s/Telegram/Wechat/g' -i background.js
sed 's/web.wechat.org/wx.qq.com/g' -i background.js
#truncate -s -1 background.js
#zip -r -FS ../pinned-wechat.zip   * --exclude '*.git*' 'telegram_to_wechat.sh'
