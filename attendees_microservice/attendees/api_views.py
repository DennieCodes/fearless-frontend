from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AccountVO, Attendee, ConferenceVO


class ConferenceVODetailEncoder(ModelEncoder):
    model = ConferenceVO
    properties = ["name", "import_href"]


class AttendeeListEncoder(ModelEncoder):
    model = Attendee
    properties = ["name"]

    def get_extra_data(self, o):
        return {"conference": o.conference.name }


class AttendeeDetailEncoder(ModelEncoder):
    model = Attendee
    properties = [
        "email",
        "name",
        "company_name",
        "created",
        "conference",
    ]
    encoders = {
        "conference": ConferenceVODetailEncoder(),
    }

    def get_extra_data(self, o):
        count = AccountVO.objects.filter(email=o.email).count()
        return {"has_account": count > 0}


@require_http_methods(["GET", "POST"])
def api_list_attendees(request, conference_vo_id=None):
    if request.method == "GET":
        if conference_vo_id is not None:
            attendees = Attendee.objects.filter(conference=conference_vo_id)
        else:
            attendees = Attendee.objects.all()
        return JsonResponse(
            {"attendees": attendees},
            encoder=AttendeeListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            # conference_href = content["conference"]
            href = f"/api/conferences/{conference_vo_id}/"
            conference = ConferenceVO.objects.get(import_href=href)
            content["conference"] = conference
        except ConferenceVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid conference id"},
                status=400,
            )

        attendee = Attendee.objects.create(**content)
        return JsonResponse(
            attendee,
            encoder=AttendeeDetailEncoder,
            safe=False,
        )


def api_show_attendee(request, pk):
    """
    Returns the details for the Attendee model specified
    by the pk parameter.

    This should return a dictionary with email, name,
    company name, created, and conference properties for
    the specified Attendee instance.

    {
        "email": the attendee's email,
        "name": the attendee's name,
        "company_name": the attendee's company's name,
        "created": the date/time when the record was created,
        "conference": {
            "name": the name of the conference,
            "href": the URL to the conference,
        }
    }
    """
    attendee = Attendee.objects.get(id=pk)
    return JsonResponse(
        attendee,
        encoder=AttendeeDetailEncoder,
        safe=False,
    )
