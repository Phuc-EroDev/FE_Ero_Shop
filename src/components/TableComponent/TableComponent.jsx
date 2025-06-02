import React, { useState } from 'react';
import { Table } from 'antd';
import Loading from '../LoadingComponent/Loading';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const TableComponent = (props) => {
  const { selectionType = 'checkbox', columns = [], data = [], isLoading = false, handleClickDeleteMany } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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

  return (
    <div>
      <Loading isPending={isLoading}>
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
