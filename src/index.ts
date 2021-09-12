export interface 日志管理者 {
    添加: (s: string) => Promise<日志管理者>
    追加: (s: string) => Promise<日志管理者>
    清空: () => Promise<日志管理者>
    获得日志池: () => Promise<日志[]>
    当变化: (f: (s: string, pool: 日志[]) => Promise<void>) => Promise<日志管理者>
}

export interface 日志 {
    产生时间: number
    内容: string
}

export function 产生日志(s: string) {
    return {
        产生时间: new Date().getTime(),
        内容: s,
    }
}

export default function 日志管理器(缓存最大条数: number = 100) {
    var pool: 日志[] = []
    var 变化回调: null | ((s: string, pool: 日志[]) => Promise<void>) = null

    var r: 日志管理者 = {
        async 添加(s) {
            pool.push(产生日志(s))
            if (变化回调 != null) {
                await 变化回调(s, pool)
            }
            return r
        },
        async 追加(s) {
            if (pool.length == 0) {
                return r.添加(s)
            }
            if (变化回调 != null) {
                变化回调(s, pool)
            }
            pool[pool.length - 1].内容 += s
            return r
        },
        async 清空() {
            pool.splice(0, pool.length)
            return r
        },
        async 获得日志池() {
            return pool
        },
        async 当变化(f) {
            变化回调 = f
            return r
        },
    }

    return r
}
