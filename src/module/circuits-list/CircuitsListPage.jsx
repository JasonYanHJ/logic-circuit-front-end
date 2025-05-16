import { Button, List, Spin } from "antd";
import { useEffect, useState } from "react"
import { request } from "../../service/request";

function CircuitsListPage() {
    const [circuitsList, setCircuitsList] = useState(null);
    useEffect(() => {
        // 每次做什么
        request("GET", "/api/v1/circuits/list").then((res) => {
            setCircuitsList(res)
        })
    },
        // 依赖数组：当依赖数组里的任何一项发生变化时，重新执行上面的函数 
        []);

    return <div>
        {circuitsList === null ?
            <Spin /> :
            <List
                bordered
                dataSource={circuitsList}
                renderItem={(item) => (
                    <List.Item>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            {item.name} <Button>前往查看</Button>
                        </div>
                    </List.Item>
                )}
            />
        }
    </div>
}

export default CircuitsListPage