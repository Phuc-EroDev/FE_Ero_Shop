import React, { useMemo, useState } from 'react';
import { Table } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import Loading from '../LoadingComponent/Loading';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { Excel } from 'antd-table-saveas-excel';
import InputComponent from '../InputComponent/InputComponent';

const TableComponent = (props) => {
  const { selectionType = 'checkbox', columns = [], data = [], isLoading = false, handleClickDeleteMany } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [nameFile, setNameFile] = useState('');

  const exportcolumns = useMemo(() => {
    const arrColumns = columns?.filter((col) => col.dataIndex !== 'action');
    return arrColumns;
  }, [columns]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //   name: record.name,
    // }),
  };

  const handleDeleteAll = () => {
    handleClickDeleteMany(selectedRowKeys);
  };

  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet('Sheet test')
      .addColumns(exportcolumns)
      .addDataSource(data, {
        str2Percent: true,
        str2Date: true,
      })
      .saveAs(`${nameFile ? nameFile : 'data'}.xlsx`);
  };

  return (
    <div>
      <Loading isPending={isLoading}>
        <div style={{ display: 'flex', justifyContent: 'right', gap: '10px' }}>
          <InputComponent
            style={{ width: '200px', marginBottom: '10px' }}
            placeholder="Nhập tên file:   *.xlsx"
            value={nameFile}
            onChange={(e) => setNameFile(e.target.value)}
          />
          <CaretRightOutlined style={{ fontSize: '20px', color: '#C68642', marginBottom: '10px' }} />
          <ButtonComponent
            onClick={exportExcel}
            size={'medium'}
            style={{
              backgroundColor: '#C68642',
              borderRadius: '4px',
              color: '#FDF6EC',
              fontWeight: '600',
              marginBottom: '10px',
            }}
            textButton={'Xuất file Excel'}
          />
        </div>
        {selectedRowKeys.length > 0 && (
          <div>
            <ButtonComponent
              onClick={handleDeleteAll}
              size={'medium'}
              style={{
                backgroundColor: '#C68642',
                borderRadius: '4px',
                color: '#FDF6EC',
                fontWeight: '600',
                marginBottom: '10px',
              }}
              textButton={'Xóa tất cả'}
            />
          </div>
        )}
        <Table
          rowSelection={Object.assign({ type: selectionType }, rowSelection)}
          columns={columns}
          dataSource={data}
          {...props}
        />
      </Loading>
    </div>
  );
};

export default TableComponent;
