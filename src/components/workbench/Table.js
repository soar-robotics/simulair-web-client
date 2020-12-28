import React from 'react';
import {
    CCard,
    CCol,
    CRow,
    CCardHeader,
    CDataTable,
    CBadge,
    CCardBody
} from '@coreui/react';
import usersData from "./UsersData";

const getBadge = status => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
}


const fields = ['name','registered', 'role', 'status']

const Table = () => {
    return (
        <>
        <CCol xs="12" lg="6">
          <CCard>
            <CCardHeader>
              Simple Table
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  )

              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
        </>
    )
}

export default Table;