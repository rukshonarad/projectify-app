import { prisma } from "../prisma/index.js";
import { crypto } from "../utils/crypto.js";
import { mailer } from "../utils/mailer.js";
import { CustomError } from "../utils/custom-error.js";
import { bcrypt } from "../utils/bcrypt.js";

class TeamMemberService {
    create = async (adminId, input) => {
        const inviteToken = crypto.createToken();
        const hashedInviteToken = crypto.hash(inviteToken);

        await prisma.teamMember.create({
            data: {
                ...input,
                adminId: adminId,
                inviteToken: hashedInviteToken
            }
        });

        await mailer.sendCreatePasswordInviteToTeamMember(
            input.email,
            inviteToken
        );
    };

    createPassword = async (inviteToken, password) => {
        const hashedInviteToken = crypto.hash(inviteToken);
        const hashedPassword = await bcrypt.hash(password);

        const admin = await prisma.teamMember.findMany({
            where: {
                inviteToken: hashedInviteToken
            }
        });

        if (!admin) {
            throw new CustomError("Invalid Token", 400);
        }

        await prisma.teamMember.update({
            where: {
                inviteToken: hashedInviteToken
            },

            data: {
                password: hashedPassword,
                status: "ACTIVE",
                inviteToken: null
            }
        });
    };
}
export const teamMemberService = new TeamMemberService();