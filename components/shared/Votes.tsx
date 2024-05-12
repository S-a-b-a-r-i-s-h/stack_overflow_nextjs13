/* eslint-disable no-useless-return */
"use client"

import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action';
import { viewQuestion } from '@/lib/actions/interaction.action';
import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.action';
import { toggleSaveQuestion } from '@/lib/actions/user.action';
import { formatAndDivideNumber } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from '../ui/use-toast';

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}
const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  hasSaved,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    })
    // TODO: show a toast
    return toast({
      className:`${!hasSaved ? 'bg-primary-100 text-primary-500' : 'bg-red-100 text-red-900'}`,
      title: `${!hasSaved ? 'Saved in' : 'Removed from'} your collection !`,
    })
  }
  const handleVote = async (action: string) => {
    if(!userId) {
      // eslint-disable-next-line no-useless-return
      return;
    }
    if(action === 'upvote') {
      if(type === 'Question') {
        console.log(JSON.parse(itemId), JSON.parse(userId), hasupVoted, hasdownVoted, pathname)
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      }
      else if(type === 'Answer') {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      }

      // TODO: show a toast
      return toast({
        className:`${!hasupVoted ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`,
        title: `Upvote ${!hasupVoted ? 'Successful' : 'Removed'} !`,
        variant: !hasupVoted ? 'default' : 'destructive',
      })
    }

    if(action === 'downvote') {
      if(type === 'Question') {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      }
      else if(type === 'Answer') {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      }

      // TODO: show a toast
      return toast({
        className:`${!hasdownVoted ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`,
        title: `Downvote ${!hasdownVoted ? 'Successful' : 'Removed'} !`,
        // variant: !hasdownVoted ? 'default' : 'destructive',
      })
    }
  }

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId? JSON.parse(userId) : undefined,
    })
  },[itemId, userId, pathname, router])

  return (
    <div className='flex gap-5'>
      <div className='flex-center gap-2.5'>
        <div className='flex-center gap-1.5'>
          <Image 
            src={ hasupVoted ? '/assets/icons/upvoted.svg' : '/assets/icons/upvote.svg' }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleVote('upvote')}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>
        </div>

        <div className='flex-center gap-1.5'>
          <Image 
            src={ hasdownVoted ? '/assets/icons/downvoted.svg' : '/assets/icons/downvote.svg' }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleVote('downvote')}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {type === 'Question' && (<Image 
        src={ hasSaved ? '/assets/icons/star-filled.svg' : '/assets/icons/star-red.svg' }
        width={18}
        height={18}
        alt="star"
        className="cursor-pointer"
        onClick={handleSave}
      />)}
    </div>
  )
}

export default Votes