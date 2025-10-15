import { prisma } from "../../core/lib/prisma";

type ReviewData = {
    rating: number;
    comment?: string;
};

export const create = async (gameId: string, userId: string, data: ReviewData) =>{
    const game = await prisma.game.findUnique({ where:{id: gameId}});
    if (!game){
        throw new Error('Game not found')
    }

    return await prisma.review.create({
        data: {
            ...data,
            gameId,
            userId,
        },
    });
};

export const findByGameId = async (gameId: string) => {
    return await prisma.review.findMany({
        where:{ gameId },
        include: {
            user:{
                select: {id: true, name: true},
            },
        },
    });
};

export const remove = async(reviewId: string, userId: string) => {
    const review = await prisma.review.findUnique({where:{id:reviewId}});

    if(!review){
        throw new Error('Review not found');
    }

    if(review.userId !== userId){
        throw new Error('Forbidden');
    }

    return await prisma.review.delete({
        where: { id:reviewId }
    });
};