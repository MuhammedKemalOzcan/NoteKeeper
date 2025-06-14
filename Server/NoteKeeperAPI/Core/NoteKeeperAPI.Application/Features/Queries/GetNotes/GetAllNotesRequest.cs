using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Application.Features.Queries.GetNotes
{
    public class GetAllNotesRequest : IRequest<GetAllNotesResponse>
    {
    }
}
