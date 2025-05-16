import { Button, Input, Spin } from "antd";
import { useEffect, useState } from "react";
import { request } from "../../service/request";

function DrawPage() {
    const [circuitComponents, setCircuitComponents] = useState(null);
    useEffect(() => {
        // 每次做什么
        request("GET", "/api/v1/components/").then((res) => {
            setCircuitComponents(res)
        })
    },
        // 依赖数组：当依赖数组里的任何一项发生变化时，重新执行上面的函数 
        []);

    return <div>
        <div><Input style={{ width: 200 }} placeholder="电路名称" /></div>
        电路组件的数据：{circuitComponents === null ? <Spin /> : JSON.stringify(circuitComponents)}
        <div style={{ width: '100%', height: 400 }}>
            <iframe style={{ width: '100%', height: '100%' }} src="https://gojs.net/latest/samples/logicCircuit.html" />
        </div>
        <div>
            <Button>保存电路</Button>
        </div>
    </div>
}

export default DrawPage