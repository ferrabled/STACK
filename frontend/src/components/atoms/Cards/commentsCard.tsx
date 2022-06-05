import AddCommentIcon from "@mui/icons-material/AddComment";
import { Button, Card, Typography } from "@mui/material";
import {
  CallGetCommentsByAsset,
  CallGetUsersById,
} from "components/wallet/userCall";
import { useEffect, useState } from "react";
import { Comment, CommentInTable } from "types";
import AddCommentModal from "../Modals/addCommentModal";
import CommentsTable from "../Table/CommentsTable";

const CommentsCard = ({ assetId }: { assetId: number }) => {
  //const [comments, setComments] = useState<Comment[]>();
  const [finalComments, setFinalComments] = useState<CommentInTable[]>();
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleCommentModal = () => {
    console.log("Add Comment");
    setShowCommentModal(true);
  };

  useEffect(() => {
    console.log("Retrieving assetId: " + assetId + " comments");
    CallGetCommentsByAsset(assetId).then((r) => {
      const comments: Comment[] = [];
      const userIds: number[] = [];
      const num = r.length;
      for (let i = 0; i < num; i++) {
        const descr = r[i].description;
        const userId = Number(r[i].userId);
        const date = Number(r[i].date);
        const comment: Comment = {
          description: descr,
          userId: userId,
          date: date,
        };
        comments.push(comment);
        userIds.push(comment.userId);
      }
      const finalComments: CommentInTable[] = [];
      CallGetUsersById(userIds).then((res) => {
        for (let i = 0; i < res.length; i++) {
          const fullComment: CommentInTable = {
            description: comments[i].description,
            userId: comments[i].userId,
            date: comments[i].date,
            fullName: res[i].name + " " + res[i].surname,
            email: res[i].email,
            telephone: Number(res[i].telephone),
          };
          finalComments.push(fullComment);
        }
        setFinalComments(finalComments);
        console.log(finalComments);
        setIsLoading(false);
      });
    });
  }, [assetId]);

  return (
    <Card className="p-5 m-5">
      <div className="flex flex-col mb-5">
        <div className="flex flex-row justify-between content-evenly p-1 mb-3">
          <Typography variant="h6">Comentarios</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCommentModal()}
          >
            <AddCommentIcon className="mr-2" /> Añadir Nuevo
          </Button>
        </div>
        {!isLoading && finalComments && (
          <>
            {finalComments.length == 0 && (
              <>
                <div className="mb-5 mx-48">
                  <Typography>
                    Aún no hay comentarios en el activo. Cualquier usuario puede
                    añadir un comentario nuevo.
                  </Typography>
                  <div className="m-2"></div>
                  <Typography align="center">
                    Puedes crear un comentario nuevo haciendo click en el
                    siguiente botón
                  </Typography>
                </div>
              </>
            )}

            {finalComments.length !== 0 && (
              <CommentsTable comments={finalComments}></CommentsTable>
            )}
          </>
        )}
      </div>
      <AddCommentModal
        show={showCommentModal}
        close={() => setShowCommentModal(false)}
        assetId={assetId}
      />
    </Card>
  );
};
export default CommentsCard;
