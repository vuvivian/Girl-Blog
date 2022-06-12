/*
 * @Author: vuvivian
 * @Description: 请输入....
 * @Date: 2022-06-11 21:26:32
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-06-12 23:18:15
 * @FilePath: /Girl-Blog/docs/.vuepress/config.js
 */
module.exports = {
    title: 'vuvivian的博客',
    description: 'Think twice, code once.',
    base: '/Girl-Blog/',
    serviceWorker: true,
    theme: 'reco', // 主题
    search: true,
    searchMaxSuggestions: 10,
    author: 'vuvivian',
    authorAvatar: '/assets/img/logo.jpeg',
    markdown: {
        lineNumbers: true
    },
    locales: {
        '/': {
          lang: 'zh-CN'
        }
    },
    head: [
        ['link', { rel: 'icon', href: '/assets/favicon.ico' }],  //favicon图标设置
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    themeConfig: {
        type: 'blog',
        subSidebar: 'auto',
        lastUpdated: '上次更新',
        logo: '/assets/img/logo.jpeg',
        authorAvatar: '/assets/img/logo.jpeg',
        editLinks: true,
        editLinkText: "在 GitHub 上编辑此页",
        nav: [
            { text: 'Home', link: '/', icon: 'reco-home' },  //text:导航标题内容，icon：图标样式
            { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
            { text: 'Docs', 
                icon: 'reco-message',
                items: [
                    { text: 'vuepress-reco', link: '/docs/theme-reco/' }  //item： 子导航
                ]
            },
            { text: 'Contact', 
                icon: 'reco-message',
                items: [
                    { text: 'GitHub', link: 'https://github.com/vuvivian', icon: 'reco-github' }
                ]
            }
        ],
        sidebar: {
            '/源码阅读/': [{
                title: '源码阅读',
                collapsable: true,
                children: [
                    'affrify.md'
                ]
            }],
            '/重学前端/': [{
                title: '重学前端',
                collapsable: true,
                children: [
                    ''
                ]
            }],
            '/': [],
        },  
    },
    plugins: [
        // 代码复制弹窗插件
        ["vuepress-plugin-nuggets-style-copy", {
          copyText: "复制代码",
          tip: {
            content: "复制成功!"
          }
        }],
         // 动态标题
        ["dynamic-title", {
            showIcon: "/favicon.ico",
            showText: "(/≧▽≦/)咦！又好了！",
            hideIcon: "/favicon.ico",
            hideText: "(●—●)呜呜，不要走嘛！！",
            recoverTime: 2000
        }],
        [
            "@vuepress-reco/vuepress-plugin-kan-ban-niang",
            {
              theme: ['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16'],
              clean: false,
              messages: {
                welcome: '我是vuvivian欢迎你的关注 ',
                home: '心里的花，我想要带你回家。',
                theme: '好吧，希望你能喜欢我的其他小伙伴。',
                close: '再见哦'
              },
              width: 240,
              height: 352
            }
        ],
        // 音乐插件
        ['meting', {
            meting: {
                // 网易云
                server: "netease",
                // 读取歌单
                type: "playlist",
                // 歌单id 
                mid: "7365766093",
            },
            // 不配置该项的话不会出现全局播放器
            aplayer: {
                // 吸底模式
                fixed: true,
                // 迷你模式
                mini: true,
                // 自动播放
                autoplay: true,
                // 歌曲栏折叠
                listFolded: true,
                // 播放器主题颜色
                theme: '#f9bcdd',
                // 播放顺序为随机
                order: 'random',
                // 初始音量
                volume: 0.1,
                // 关闭歌词显示
                lrcType: 0
            },
            mobile: {
                // 手机端去掉cover图
                cover: false,
            }
        }],
        // //彩带背景 先安装在配置， npm install vuepress-plugin-ribbon --save
        ["ribbon", {
            size: 90,     // width of the ribbon, default: 90
            opacity: 0.8, // opacity of the ribbon, default: 0.3
            zIndex: -1    // z-index property of the background, default: -1
        }],
    ],
  }