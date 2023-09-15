import { HistoryType } from "@/types"
import {
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from "@chakra-ui/react"


function HistorySL(props: { historySL: Array<HistoryType> }) {
    let historySL = props.historySL
    return (
        <TableContainer>
            <Table variant="striped" size="md">
                <Thead>
                    <Tr>
                        <Th>name</Th>
                        <Th>Time</Th>
                        <Th>quantity</Th>
                        <Th>appetite</Th>
                        <Th>feedback</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {historySL.map((shop, index) => {
                        return (
                            <Tr key={shop.date}>
                                <Td>{shop.shop_name}</Td>
                                <Td>{shop.date}</Td>
                                <Td>{shop.quantity}</Td>
                                <Td>{shop.appetite}</Td>
                                <Td>{shop.feedback}</Td>
                            </Tr>
                        )
                    }
                    )}
                </Tbody>
            </Table>
        </TableContainer>
    )

}

export default HistorySL