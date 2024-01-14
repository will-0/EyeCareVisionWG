import './App.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { ContentActions } from '@state/content'

import RequestButton from '@components/RequestButton'
import Table from '@components/Table'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/get_sheets_data`)
    .then(response => response.json())
    .then(data => {
      const parsed_data = data.slice(1).map((item: any, _: number) => {
        return {
          concept_id: item[0],
          concept_name: item[1],
          formSpecification: (item[2] && item[2] != "") ? JSON.parse(item[2]) : undefined,
          // unpack any remaining entries into an array
          otherData: [...item.slice(3)]
        }
      })
      dispatch(ContentActions.setContent({
        data: parsed_data
      }))
    })
  }, [])

  const layout_style = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: "2em"
  }

  return (
    <div style={layout_style}>
      <Table />
      <RequestButton concept_id={-1} concept_name="Request new code"/>
    </div>
  );
  
}

export default App
