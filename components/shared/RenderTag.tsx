import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>
      {showCount && (
        <div className="background-light800_dark300 flex h-[25px] w-[25px] items-center justify-center rounded-full">
          <p className="small-medium  text-light400_light500">
            {totalQuestions}
          </p>
        </div>
      )}
    </Link>
  );
};

export default RenderTag;
