import React, {useState} from 'react';
import moment from 'moment';
import './TableDate.css';

interface IDataState {
    date: number;
    totalTimes: number;
}

interface IFlagState {
    date: boolean;
    totalTimes: boolean;
}

function TableDate() {
    const [data, setData] = useState<IDataState[]>([
        {date: 1508688000000, totalTimes: 68112 }, // 2017年10月23日
        {date: 1501948800000, totalTimes: 68020 }, // 2017年8月6日
        {date: 1510329600000, totalTimes: 69433 }, // 2017年11月11日
        {date: 1462982400000, totalTimes: 69699 }, // 2016年5月12日
        {date: 1484668800000, totalTimes: 42565 }, // 2017年1月18日
    ]);

    const [flag, setFlag] = useState<any>({
        date: true,
        totalTimes: true,
    });

    const upSort = (propertyName: string) => {
        return function (object1: any, object2: any) {
            const value1 = object1[propertyName];
            const value2 = object2[propertyName];
            return value1 - value2;
        }
    };

    const downSort = (propertyName: string) => {
        return function (object1: any, object2: any) {
            const value1 = object1[propertyName];
            const value2 = object2[propertyName];
            return value2 - value1;
        }
    };

    const dateFn = (prop: string) => {
        if (flag[prop] === true) {
            data.sort(upSort(prop));
        } else {
            data.sort(downSort(prop));
        }
        flag[prop] = !flag[prop];
        setData([...data]);
    };

    return (
        <div>
            <h1>题目</h1>
            <p>以下表格，点击 `#data .date` 后使表格按日期排序，当前是正序则改为倒序，当前是倒序则改为正序。</p>
            <table id="data">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th className="date cursor" onClick={() => dateFn('date')}>日期</th>
                        <th className="total cursor" onClick={() => dateFn('totalTimes')}>总次数</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map(function (item, index) {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{!!item.date ? moment(item.date).format('YYYY年MM月DD日') : '--'}</td>
                                <td>{item.totalTimes}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default TableDate;
