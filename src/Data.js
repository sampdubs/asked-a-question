
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getStudentData } from './helpers';

function Data() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
          const options = await getStudentData();
          setData(options);
        }
        getData();
      }, []);

    return (
        <Table striped bordered>
            <thead>
                <tr>
                    <th>Student</th>
                    <th># Questions answered</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((data, i) => (
                        <tr key={i}>
                            <td>{data.student}</td>
                            <td>{data.questions}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}

export default Data;