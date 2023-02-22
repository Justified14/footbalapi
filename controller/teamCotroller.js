const Teams = require('../models/team')

const getAllTeams = async (req, res) => {
    const {name, location, uclwinner, sort, select, numberFilters } = req.query
    let queryObject = {};
    let result = Teams.find(queryObject);
    if (name){
        queryObject.name = {$regex: name, $options: 'i' };
    }
    if (location){
        queryObject.location = {$regex: location, $options: 'i' };
    }
    if (uclwinner){
        queryObject.uclwinner = uclwinner === 'true' ? true : false;
    }

    if(numberFilters){
        const operatorMap={
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        };
        const regEx = /\b(<|>|>=|<=|=)\b/g;
        let filters = numberFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        console.log(filters);
        const options = ['rating']
        filters = filters.split(',').forEach((items) => {
            const [search, operator, value] = items.split('-')
            if(options.includes(search)){
                queryObject[search] = {[operator]: Number(value)};
            }
        })
    }
    //sort
    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    //select
    if(select){
        const selectList = select.split(',').join(' ');
        result = result.select(selectList);
    }
    //limit
    const limit = Number(req.query.limit)
    result = result.limit(limit);

    //numberFilter


    result = result.find(queryObject);
    const teams = await result
    res.status(200).json({noOfTeams: teams.length, teams});
};

module.exports = getAllTeams;

//email, image,

