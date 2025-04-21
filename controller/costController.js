const { Cost } = require("../model/CostSchema");

const getCost = async (req, res) => {
  try {
    let query = {};

    if (req.query.date) {
      const requestedDate = new Date(req.query.date);
      const nextDay = new Date(requestedDate);
      nextDay.setDate(nextDay.getDate() + 1);

      query.date = {
        $gte: requestedDate,
        $lt: nextDay,
      };
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      query.date = {
        $gte: today,
        $lt: tomorrow,
      };
    }

    let cost = await Cost.find(query);
    res.status(200).json({
      message: "Data got Successfully",
      data: cost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching cost data" });
  }
};

const getRecommendations = async (req, res) => {
  try {
    let query = {};

    if (req.query.date) {
      const requestedDate = new Date(req.query.date);
      const nextDay = new Date(requestedDate);
      nextDay.setDate(nextDay.getDate() + 1);

      query.date = {
        $gte: requestedDate,
        $lt: nextDay,
      };
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      query.date = {
        $gte: today,
        $lt: tomorrow,
      };
    }

    const costs = await Cost.find(query);
    const recs = costs.map((item) => {
      let recommendation = null;

      switch (item.service) {
        case "Microsoft.Compute":
          if (item.cost > 20) {
            recommendation = {
              customerId: item.customerId,
              resource: item.resource,
              recommendation_type: "Resize VM",
              details: "Consider resizing this VM to a smaller size.",
              estimated_savings: item.cost * 0.3,
            };
          }
          break;

        case "Microsoft.SQL":
          if (item.cost > 10) {
            recommendation = {
              customerId: item.customerId,
              resource: item.resource,
              recommendation_type: "Enable Auto-Pause",
              details: "Enable auto-pause for inactive SQL databases.",
              estimated_savings: item.cost * 0.25,
            };
          }
          break;

        case "Microsoft.Storage":
          if (item.cost > 5) {
            recommendation = {
              customerId: item.customerId,
              resource: item.resource,
              recommendation_type: "Move to Cool Tier",
              details: "Move infrequent storage to the cool tier.",
              estimated_savings: item.cost * 0.2,
            };
          }
          break;

        case "Microsoft.Network":
          if (item.cost > 2) {
            recommendation = {
              customerId: item.customerId,
              resource: item.resource,
              recommendation_type: "Review Load Balancers",
              details: "Check for idle or unused load balancers.",
              estimated_savings: item.cost * 0.15,
            };
          }
          break;

        case "Microsoft.KeyVault":
          if (item.cost > 1) {
            recommendation = {
              customerId: item.customerId,
              resource: item.resource,
              recommendation_type: "Review Secrets Rotation",
              details: "Ensure secrets are rotated to avoid unnecessary costs.",
              estimated_savings: item.cost * 0.1,
            };
          }
          break;

        default:
          break;
      }

      return recommendation;
    });

    const filteredRecs = recs.filter(Boolean);

    res.status(200).json({
      message: "Recommendations generated",
      data: filteredRecs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error generating recommendations" });
  }
};

module.exports = {
  getCost,
  getRecommendations,
};
