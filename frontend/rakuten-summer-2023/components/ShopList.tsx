import { ShopType } from "@/types"
import {
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Button
} from "@chakra-ui/react"
import Link from "next/link"
import { useContext } from "react";
import { LoginUser } from "../pages/_app";


function ShopList(props: { shopList: Array<ShopType> }) {
    let shopList = props.shopList.slice(0, 5)
    const { userInfo, setUserInfo } = useContext(LoginUser)
    return (
        <TableContainer>
            <Text fontSize="2xl">Shop recommendation for you</Text>
            <Table variant="striped" size="md">
                <Thead>
                    <Tr>
                        <Th>name</Th>
                        <Th>genre</Th>
                        <Th>location</Th>
                        <Th>quantity[g]</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {shopList.map((shop, index) => {
                        return (
                            <Tr key={shop.id}>
                                <Td>{shop.name}</Td>
                                <Td>{shop.genre}</Td>
                                <Td>{shop.location.split(",")[0]}</Td>
                                <Td>{shop.quantity}</Td>
                                <Td>
                                    <Button
                                        colorScheme="teal"
                                        variant='outline'
                                    >
                                        <Link 
                                            href={{ pathname: `/shop/`, query: {...shop, ...userInfo} }}
                                            // target="_blank"
                                        >
                                            Detail
                                        </Link>
                                    </Button> 
                                </Td>
                            </Tr>
                        )
                    }
                    )}
                </Tbody>
            </Table>
        </TableContainer>
    )

}

export default ShopList