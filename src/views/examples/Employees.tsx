import MUIDataTable from 'mui-datatables'
import { useState, useEffect, useMemo, useContext } from 'react'
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from 'reactstrap'
import { Employee } from '../../@types/decs'
// core components
import Header from '../../components/Headers/Header'
import { Context } from '../../context'
import { handlePing } from './utils'

const ShowModal = () => {
  // Modal open state
  var modal = false

  // Toggle for Modal
  const toggle = () => { modal = !modal }
  console.log(modal)
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Sample Modal Title</ModalHeader>
      <ModalBody>Sample Modal Body Text to display...</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Okay
        </Button>
      </ModalFooter>
    </Modal>
  )
}

// const Card = (props: Employee) => {
//   // eslint-disable-next-line prefer-const
//   let { id, name, email, phone, dept } = props
//   const [updateName, setUpdateName] = useState(name)
//   const [updateEmail, setUpdateEmail] = useState(email)
//   const [updatePhone, setUpdatePhone] = useState(phone)
//   const [updateDept, setUpdateDept] = useState(dept)
//   const [firstMarginLeftValue, setFirstMarginLeftValue] = useState<
//     string | number
//   >(0)
//   const [secondMarginLeftValue, setSecondMarginLeftValue] = useState<
//     string | number
//   >('-110%')
//   return (
//     <>
//       <div className="front-side">
//         <div className="color-grid">
//           <div className="black" />
//           <div className="red1" />
//           <div className="red2" />
//           <div className="green" />
//         </div>
//         <div className="info-grid" style={{ marginLeft: firstMarginLeftValue }}>
//           <div className="name">
//             <h2>{name}</h2>
//             <h5>{dept}</h5>
//           </div>
//           <button
//             type="button"
//             className="edit"
//             onClick={() => {
//               setFirstMarginLeftValue('-110%')
//               setSecondMarginLeftValue(0)
//             }}
//           >
//             <p>
//               <strong>EDIT</strong>
//             </p>
//           </button>
//           <button
//             type="button"
//             className="delete"
//             onClick={() => {
//               window.main.sendMessage('ipc-example', [{ aim: EMP.DELETE, id }])
//             }}
//           >
//             <i className="ni ni-fat-delete"></i>
//           </button>
//           <div className="phoneNo">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               xmlnsXlink="http://www.w3.org/1999/xlink"
//               version="1.1"
//               viewBox="0 0 472.811 472.811"
//               enableBackground="new 0 0 472.811 472.811"
//               width="30px"
//               height="30px"
//             >
//               <g>
//                 <path
//                   d="M358.75,0H114.061C97.555,0,84.128,13.428,84.128,29.934v412.944c0,16.505,13.428,29.934,29.934,29.934H358.75   c16.506,0,29.934-13.428,29.934-29.934V29.934C388.683,13.428,375.256,0,358.75,0z M99.128,75.236h274.556v312.687H99.128V75.236z    M114.061,15H358.75c8.234,0,14.934,6.699,14.934,14.934v35.302H99.128V29.934C99.128,21.699,105.827,15,114.061,15z    M358.75,457.811H114.061c-8.234,0-14.934-6.699-14.934-14.934v-44.955h274.556v44.955   C373.683,451.112,366.984,457.811,358.75,457.811z"
//                   fill="#FFFFFF"
//                 />
//                 <path
//                   d="m236.406,404.552c-13.545,0-24.564,11.02-24.564,24.565s11.02,24.564 24.564,24.564 24.564-11.02 24.564-24.564-11.019-24.565-24.564-24.565zm0,39.129c-8.031,0-14.564-6.534-14.564-14.564 0-8.031 6.533-14.565 14.564-14.565s14.564,6.534 14.564,14.565c0,8.03-6.533,14.564-14.564,14.564z"
//                   fill="#FFFFFF"
//                 />
//                 <path
//                   d="m202.406,47.645h68c2.762,0 5-2.239 5-5s-2.238-5-5-5h-68c-2.762,0-5,2.239-5,5s2.238,5 5,5z"
//                   fill="#FFFFFF"
//                 />
//                 <path
//                   d="m184.409,47.645c1.31,0 2.6-0.53 3.53-1.46 0.93-0.94 1.47-2.22 1.47-3.54s-0.54-2.6-1.47-3.54c-0.931-0.93-2.221-1.46-3.53-1.46-1.32,0-2.601,0.53-3.54,1.46-0.93,0.93-1.46,2.22-1.46,3.54s0.53,2.6 1.46,3.54c0.93,0.93 2.22,1.46 3.54,1.46z"
//                   fill="#FFFFFF"
//                 />
//               </g>
//             </svg>
//             <p style={{ color: 'whitesmoke' }}>{phone}</p>
//           </div>
//           <div className="emailId">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               xmlnsXlink="http://www.w3.org/1999/xlink"
//               version="1.1"
//               viewBox="0 0 467.211 467.211"
//               enableBackground="new 0 0 467.211 467.211"
//               width="30px"
//               height="30px"
//             >
//               <g>
//                 <path
//                   d="m413.917,96.775h-360.622c-6.369,0-11.551,5.181-11.551,11.55v213.182c0,6.369 5.182,11.55 11.551,11.55h360.622c6.368,0 11.55-5.181 11.55-11.55v-213.181c-5.68434e-14-6.369-5.182-11.551-11.55-11.551zm1.55,224.732c0,0.855-0.695,1.55-1.55,1.55h-360.622c-0.855,0-1.551-0.696-1.551-1.55v-213.181c0-0.855 0.695-1.55 1.551-1.55h360.622c0.854,0 1.55,0.696 1.55,1.55v213.181z"
//                   fill="#FFFFFF"
//                 />
//                 <path
//                   d="m459.711,340.558h-11.744v-237.715c0-15.752-12.815-28.568-28.568-28.568h-371.586c-15.753,0-28.568,12.815-28.568,28.568v237.714h-11.745c-4.143,0-7.5,3.358-7.5,7.5v20.605c0,13.384 10.889,24.272 24.272,24.272h418.666c13.384,0 24.272-10.889 24.272-24.272v-20.605c0.001-4.141-3.356-7.499-7.499-7.499zm-425.467-237.715c-2.84217e-14-7.481 6.087-13.568 13.568-13.568h371.586c7.481,0 13.568,6.086 13.568,13.568v237.714h-398.722v-237.714zm177.361,252.715h44v3.922c0,1.755-1.428,3.184-3.184,3.184h-37.633c-1.756,0-3.184-1.428-3.184-3.184v-3.922zm240.607,13.105c0,5.113-4.159,9.272-9.272,9.272h-418.667c-5.113,0-9.272-4.16-9.272-9.272v-13.105h11.744 174.861v3.922c0,7.27 5.914,13.184 13.184,13.184h37.633c7.27,0 13.184-5.914 13.184-13.184v-3.922h174.861 11.744v13.105z"
//                   fill="#FFFFFF"
//                 />
//               </g>
//             </svg>
//             <p className="email" style={{ color: 'whitesmoke' }}>
//               {email}
//             </p>
//           </div>
//         </div>
//         <div
//           className="info-grid-edit"
//           style={{ marginLeft: secondMarginLeftValue }}
//         >
//           <form>
//             <input
//               type="text"
//               placeholder="Name"
//               defaultValue={name}
//               onChange={e => setUpdateName(e.target.value)}
//             />
//             <br />
//             <input
//               type="text"
//               placeholder="Email"
//               defaultValue={email}
//               onChange={e => setUpdateEmail(e.target.value)}
//             />
//             <br />
//             <input
//               type="text"
//               placeholder="Mobile Number"
//               defaultValue={phone}
//               onChange={e => setUpdatePhone(e.target.value)}
//             />
//             <br />
//             <input
//               type="text"
//               placeholder="Department"
//               defaultValue={dept}
//               onChange={e => setUpdateDept(e.target.value)}
//             />
//             <br />
//             <button
//               type="button"
//               onClick={() => {
//                 ;[name, email, phone, dept] = [
//                   updateName || name,
//                   updateEmail || email,
//                   updatePhone || phone,
//                   updateDept || dept,
//                 ]
//                 window.main.sendMessage('ipc-example', [
//                   { aim: EMP.UPDATE, name, email, phone, dept, id },
//                 ])
//                 setSecondMarginLeftValue('-110%')
//                 setFirstMarginLeftValue(0)
//               }}
//             >
//               update
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   )
// }

const Employees = () => {
  const { emps, handleSetEmps } = useContext<any>(Context)
  useMemo(() => handlePing('emp'), [])

  useEffect(() => {
    window.main.on('ipc-example', handleSetEmps)
    // handlePing()
    return () => {
      window.main.removeListener('ipc-example', handleSetEmps)
    }
  })

  const columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'phone',
      label: 'Mobile Number',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'dept',
      label: 'Department',
      options: {
        filter: true,
        sort: true,
      },
    },
  ]

  const options = {
    selectableRowsHideCheckboxes: true,
  }

  return (
    <>
      <Header />

      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Employee List</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile Number</th>
                    <th scope="col">Department</th>
                    {/* <th scope="col" /> */}
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {(emps as Employee[]).map(emp => (
                    <tr key={emp.id}>
                      <th scope="row">
                        <Media>
                          <span className="mb-0 text-sm">{emp.name}</span>
                        </Media>
                      </th>
                      <td>{emp.email}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          {emp.phone}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">{emp.dept}</span>
                        </div>
                      </td>
                      <td className="text-left">
                        <Button color="primary" onClick={ShowModal}>
                          Update
                        </Button>
                        <Button color="danger">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default Employees
