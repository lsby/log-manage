import lib from '../dist/'
import * as tools from '@lsby/js_tools'

var 日志管理者 = lib()

describe('基本测试', function () {
    it('测试1', async function () {
        var p = await 日志管理者.获得日志池()

        await 日志管理者.添加('1')
        await 日志管理者.添加('2')
        await 日志管理者.追加('3')

        tools.断言相等(p.length, 2)
        tools.断言相等(p[0].内容, '1')
        tools.断言相等(p[1].内容, '23')

        await 日志管理者.清空()
        tools.断言相等(p.length, 0)
    })
    it('测试2', async function () {
        var s = 1
        var p = await 日志管理者.获得日志池()

        日志管理者.当变化(async () => {
            s = 2
        })

        日志管理者.添加('1')

        tools.断言相等(p.length, 1)
        tools.断言相等(p[0].内容, '1')
        tools.断言相等(s, 2)
    })
})
