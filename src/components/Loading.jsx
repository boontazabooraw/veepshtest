import React from 'react'

import { Spinner } from "@/components/ui/spinner"

const Loading = (size) => {
    return (
        <div className="">
            <Spinner className={`size-${size}`}/>
        </div>
    )
}

export default Loading