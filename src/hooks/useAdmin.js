import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    // console.log(email);
    useEffect(() => {
        if (email) {
            fetch(`https://phone-kinun-server-nazmulrony.vercel.app/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(email);
                    // console.log(data);
                    setIsAdmin(data.isAdmin);
                    setIsAdminLoading(false);
                })
        }
    }, [email])
    return [isAdmin, isAdminLoading]
}
export default useAdmin;